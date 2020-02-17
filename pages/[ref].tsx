import React, {
  FC,
  useMemo,
  cloneElement,
  useState,
  ReactNode,
  ReactElement,
  useEffect,
  useCallback
} from "react";
import { NextPage } from "next";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import {
  Verse,
  BaseMark,
  Mark,
  ApiResponse,
  SlimBookAndChapter,
  SlimBookAndChapterAndVerse,
  SlimVerse
} from "../utils/types";
import Verses from "../components/Verses";
import MarksContext from "../contexts/MarksContext";
import SpeakerLegend from "../components/SpeakerLegend";
import unique from "../utils/unique";
import {
  MdClose,
  MdSave,
  MdErrorOutline,
  MdDone,
  MdRecordVoiceOver,
  MdNavigateBefore,
  MdNavigateNext,
  MdEdit,
  MdDelete
} from "react-icons/md";
import classnames from "classnames";
import uuid from "uuid/v4";
import CircleButton from "../components/CircleButton";

type Unstyled<T extends keyof JSX.IntrinsicElements> = Omit<
  JSX.IntrinsicElements[T],
  "className" | "style"
>;

const Heading: FC<Unstyled<"h1"> & { level: 1 | 2 | 3 | 4 | 5 | 6 }> = ({
  level,
  ...props
}) => {
  const HWhat = `h${level}` as "h1" | "h2" | "h3" | "h5" | "h6";
  return (
    <HWhat
      {...props}
      className={classnames("font-bold text-center", {
        "text-lg": level === 5,
        "text-xl": level === 4,
        "text-2xl": level === 3,
        "text-3xl": level === 2,
        "text-4xl": level === 1
      })}
    />
  );
};

const Label: FC<Unstyled<"label">> = props => (
  <label {...props} className="font-bold py-2 inline-block" />
);

const FormGroup: FC<Unstyled<"div"> & {
  label: ReactNode;
  control: ReactElement<{ id?: string }>;
}> = ({ label, control, children, ...props }) => {
  const [id, setId] = useState<string | undefined>(undefined);
  useEffect(() => setId(uuid()), []);
  return (
    <div {...props} className="flex justify-between">
      <div>
        <Label htmlFor={id}>{label}</Label>
        {children}
      </div>
      <div>
        {cloneElement(control, {
          id
        })}
      </div>
    </div>
  );
};

const Select: FC<Unstyled<"select">> = props => (
  <div className="relative">
    <select
      {...props}
      className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
    />
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
      <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
      </svg>
    </div>
  </div>
);

const Textarea: FC<Unstyled<"textarea">> = props => (
  <textarea
    {...props}
    className="block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
  />
);

const Button: FC<Unstyled<"button"> & {
  intent?: "success" | "error" | "warning" | "danger";
}> = props => <button type="button" {...props} />;

const IconButton: FC<Unstyled<"button">> = props => <button {...props} />;

const buildSpeakerMarks = (
  marks: Array<BaseMark>,
  speaker: string
): Array<Mark> =>
  marks.map(mark => ({
    ...mark,
    id: uuid(),
    type: "speaker",
    speaker
  }));

class ErrorBoundary extends React.Component<
  { children?: ReactNode },
  { error?: Error }
> {
  state: { error?: Error } = {};
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  render() {
    return this.state.error ? (
      <div>{this.state.error.stack}</div>
    ) : (
      this.props.children
    );
  }
}

const getUrl = ({
  book,
  chapter,
  verse = undefined
}: SlimBookAndChapter & { verse?: SlimVerse }) =>
  `/${book.title.replace(/\s/g, "")}${chapter.number}${
    verse?.number ? `.${verse?.number}` : ""
  }`;

const fetchVerses = async (
  ref: string
): Promise<{ verses: Array<Verse>; prev?: string; next?: string }> => {
  const res = await fetch(
    `http://localhost:3000/api/ref/${encodeURIComponent(ref as string)}`
  );
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  const result: ApiResponse = await res.json();
  switch (result.type) {
    case "chapter": {
      const { prev, next } = result;
      return { verses: result.verses, prev: getUrl(prev), next: getUrl(next) };
    }
    case "verses":
      return { verses: result.verses };
    case "verse": {
      const { prev, next } = result;
      return { verses: [result.verse], prev: getUrl(prev), next: getUrl(next) };
    }
    default:
      return { verses: [] };
  }
};

const Pagination: FC<{ type: "prev" | "next"; href: string }> = ({
  type,
  href
}) => (
  <Link href="/[ref]" as={href}>
    <a
      className={classnames(
        "fixed flex flex-col justify-center items-center top-0 bottom-0 w-12 text-center text-6xl text-gray-500 hover:text-gray-900 cursor-pointer hover:bg-gray-100 duration-300",
        {
          "left-0": type === "prev",
          "right-0": type === "next"
        }
      )}
    >
      {type === "prev" ? <MdNavigateBefore /> : <MdNavigateNext />}
    </a>
  </Link>
);

const Ref: NextPage<{
  reference: string;
  verses: Array<Verse>;
  prev?: string;
  next?: string;
}> = props => {
  const [verses, setVerses] = useState(props.verses);
  const [marks, setMarks] = useState<Array<BaseMark> | null>(null);

  useEffect(() => {
    setVerses(props.verses);
  }, [props.verses]);

  const contextValue = useMemo(
    () => ({
      speakers: unique(
        verses
          .flatMap((v: Verse) => v.marks)
          .filter(note => note.type === "speaker")
          .map(note => note.speaker)
      )
    }),
    [verses]
  );

  const saveMarks = async (newMarks: Array<Mark>) => {
    const response = await fetch("/api/marks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMarks)
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    setVerses(prev =>
      prev.map(verse => ({
        ...verse,
        marks: [
          ...verse.marks,
          ...newMarks.filter(note => note.verseId === verse.id)
        ]
      }))
    );
  };

  const [isSpeakerFormOpen, setIsSpeakerFormOpen] = useState(false);
  const [selectedMarkId, setSelectedMarkId] = useState<string | null>(null);

  const deleteMark = async (id: string) => {
    const response = await fetch(`/api/marks/${encodeURIComponent(id)}`, {
      method: "DELETE"
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    // TODO: handle error
  };

  return (
    <>
      {props.prev && <Pagination type="prev" href={props.prev} />}
      <MarksContext.Provider value={contextValue}>
        <div className="fixed top-0 left-0 ml-4">
          <SpeakerLegend />
        </div>
        <Verses
          verses={verses}
          setMarks={setMarks}
          selectMark={setSelectedMarkId}
        />
      </MarksContext.Provider>
      {props.next && <Pagination type="next" href={props.next} />}
      <div className="fixed bottom-0 right-0 pr-4 pb-4">
        {selectedMarkId && (
          <>
            <div>
              <CircleButton themeId="blue" onClick={() => alert("TODO")}>
                <MdEdit />
              </CircleButton>
            </div>
            <div>
              <CircleButton
                themeId="red"
                onClick={() => deleteMark(selectedMarkId)}
              >
                <MdDelete />
              </CircleButton>
            </div>
          </>
        )}
        {marks && (
          <div>
            {isSpeakerFormOpen && (
              <div
                className="fixed top-0 right-0 bottom-0 left-0"
                onClick={() => setIsSpeakerFormOpen(false)}
              />
            )}
            <CircleButton
              themeId="yellow"
              onClick={() => {
                window.getSelection()?.removeAllRanges();
                setIsSpeakerFormOpen(is => !is);
              }}
            >
              <div className="whitespace-no-wrap">
                <div className="h-20 w-20 inline-flex align-middle justify-center items-center">
                  <MdRecordVoiceOver />
                </div>
                <div
                  className={classnames(
                    "inline-block align-middle text-base text-black overflow-hidden min-w-0 duration-200",
                    {
                      "max-w-64": isSpeakerFormOpen,
                      "max-w-0": !isSpeakerFormOpen
                    }
                  )}
                >
                  <div className="pr-6">
                    <Select
                      onClick={e => e.stopPropagation()}
                      onChange={e => {
                        const speaker = e.currentTarget.value;
                        if (speaker) {
                          saveMarks(buildSpeakerMarks(marks, speaker));
                          setMarks(null);
                        }
                      }}
                    >
                      <option />
                      <option>angel</option>
                      <option>isaiah-1</option>
                      <option>holy-ghost</option>
                      <option>jacob-2</option>
                      <option>jesus-christ</option>
                      <option>john-the-baptist</option>
                      <option>joseph-1</option>
                      <option>laban</option>
                      <option>laman</option>
                      <option>lehi-1</option>
                      <option>lemuel</option>
                      <option>nephi-1</option>
                      <option>sariah</option>
                    </Select>
                  </div>
                </div>
              </div>
            </CircleButton>
          </div>
        )}
      </div>
    </>
  );
};

Ref.getInitialProps = async ({ query: { ref } }) => {
  const { verses, prev, next } = await fetchVerses(ref as string);
  return { reference: ref as string, verses, prev, next };
};

export default Ref;
