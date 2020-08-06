import React, {
  FC,
  Children,
  cloneElement,
  ReactNode,
  isValidElement,
} from 'react';

const Table: FC<JSX.IntrinsicElements['table']> = ({children}) => (
  <table className="w-full bg-white shadow-2xl rounded-lg overflow-hidden">
    {Children.map<ReactNode, ReactNode>(children, (tableChild) => {
      if (
        !isValidElement(tableChild) ||
        !['thead', 'tbody', 'tfoot'].includes(tableChild.type as any)
      ) {
        throw new Error('Expected table section');
      }
      return cloneElement(tableChild, {
        children: Children.map<ReactNode, ReactNode>(
          tableChild.props.children,
          (sectionChild) => {
            if (!isValidElement(sectionChild) || sectionChild.type !== 'tr') {
              throw new Error('Expected table row');
            }
            return cloneElement(sectionChild, {
              className: 'even:bg-gray-100',
              children: Children.map<ReactNode, ReactNode>(
                sectionChild.props.children,
                (rowChild) => {
                  if (!isValidElement(rowChild)) {
                    return rowChild;
                  }
                  switch (rowChild.type) {
                    case 'th':
                      return cloneElement(rowChild, {
                        className: 'border bold text-left p-2 bg-gray-400',
                      });
                    case 'td':
                      return cloneElement(rowChild, {className: 'border p-2'});
                    default:
                      throw new Error('Expected table cell p-2');
                  }
                },
              ),
            });
          },
        ),
      });
    })}
  </table>
);

export default Table;
