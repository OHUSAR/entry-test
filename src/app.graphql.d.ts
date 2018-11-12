import {DocumentNode} from 'graphql/language/ast';
/* tslint:disable */
//  This file was automatically generated and should not be edited.

export interface testQuery {
  complaints:  {
    __typename: "ComplaintNodeConnection",
    edges:  Array< {
      __typename: "ComplaintNodeEdge",
      /**
       * The item at the end of the edge
       */
      node:  {
        __typename: "ComplaintNode",
        /**
         * The ID of the object.
         */
        id: string,
        server:  {
          __typename: "AdminsServerNode",
          name: string,
        } | null,
        targetType:  {
          __typename: "AdminsContentTypeNode",
          model: string,
          /**
           * The ID of the object.
           */
          id: string,
        } | null,
      } | null,
    } | null >,
  } | null,
}

declare var document: DocumentNode;
export default document;