import React, {
  FC,
  useMemo,
  cloneElement,
  useState,
  ReactNode,
  ReactElement,
  useEffect
} from "react";
import { NextPage } from "next";
import fetch from "isomorphic-unfetch";
import {
  Verse,
  Mark,
  DrawerView as $DrawerView,
  Annotation
} from "../utils/types";
import Verses from "../components/Verses";
import AnnotationsContext from "../contexts/AnnotationsContext";
import SpeakerLegend from "../components/SpeakerLegend";
import unique from "../utils/unique";
import { MdClose } from "react-icons/md";
import classnames from "classnames";
import uuid from "uuid/v4";

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

const Button: FC<Unstyled<"button">> = props => (
  <button type="button" {...props} />
);

const IconButton: FC<Unstyled<"button">> = props => <button {...props} />;

const Drawer: FC<{
  children: ReactNode;
  isOpen: boolean;
  close: () => void;
}> = ({ isOpen, close, children }) => (
  <div
    className={classnames(
      "fixed top-0 right-0 bottom-0 duration-200 ease-in bg-gray-100 opacity-75",
      {
        "w-0": !isOpen,
        "w-3/4 sm:w-3/12": isOpen
      }
    )}
  >
    <div className="absolute left-0 top-0 p-2">
      <IconButton onClick={close}>
        <MdClose />
      </IconButton>
    </div>
    {children}
  </div>
);

const CreateAnnotation: FC<{ marks: Array<Mark> }> = ({ marks }) => {
  const [notes, setNotes] = useState<Array<Annotation> | null>(null);
  const [speaker, setSpeaker] = useState("");
  return (
    <form>
      <Heading level={1}>Create Annotation</Heading>
      <textarea readOnly value={JSON.stringify(marks, null, 2)} />
      <FormGroup
        label="Speaker"
        control={
          <Select
            value={speaker}
            onChange={e => setSpeaker(e.currentTarget.value)}
          >
            <option />
            <option>jesus-christ</option>
            <option>joseph-1</option>
            <option>laman</option>
            <option>lehi-1</option>
            <option>lemuel</option>
            <option>nephi-1</option>
          </Select>
        }
      />
      <div className="text-center">
        <Button
          onClick={() =>
            setNotes(
              marks.map(mark => ({
                ...mark,
                id: uuid(),
                type: "speaker",
                speaker
              }))
            )
          }
        >
          Create
        </Button>
      </div>
      {notes && (
        <FormGroup
          label="Annotations"
          control={
            <Textarea
              readOnly
              rows={40}
              value={JSON.stringify(notes, null, 2)
                .replace(/^\[/, "")
                .replace(/\]$/, "")}
            />
          }
        />
      )}
    </form>
  );
};

const DrawerView: FC<{ view: $DrawerView | null }> = ({ view }) => {
  if (view?.type === "CREATE_ANNOTATIONS") {
    return <CreateAnnotation marks={view.marks} />;
  }
  return null;
};

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

const Ref: NextPage<{
  verses: Array<Verse>;
}> = ({ verses }) => {
  const [drawerView, setDrawerView] = useState<$DrawerView | null>(null);
  const contextValue = useMemo(
    () => ({
      speakers: unique(
        verses
          .flatMap((v: Verse) => v.annotations)
          .filter(note => note.type === "speaker")
          .map(note => note.speaker)
      )
    }),
    [verses]
  );

  return (
    <>
      <div className="flex flex-col h-screen">
        <AnnotationsContext.Provider value={contextValue}>
          <div className="bg-red flex flex-row flex-no-wrap">
            <SpeakerLegend />
          </div>
          <div className="flex-grow overflow-y-scroll">
            <Verses verses={verses} setDrawerView={setDrawerView} />
          </div>
        </AnnotationsContext.Provider>
      </div>
      <Drawer isOpen={drawerView !== null} close={() => setDrawerView(null)}>
        {drawerView && <DrawerView view={drawerView} />}
      </Drawer>
    </>
  );
};

Ref.getInitialProps = async ({ query: { ref } }) => {
  const res = await fetch(
    `http://localhost:3000/api/byRef/${encodeURIComponent(ref as string)}`
  );
  if (res.ok) {
    const verses = await res.json();
    return { verses };
  }
  throw new Error(res.statusText);
};

export default Ref;
