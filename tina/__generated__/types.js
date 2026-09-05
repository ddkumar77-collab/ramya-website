export function gql(strings, ...args) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (args[i] || "");
  });
  return str;
}
export const BioPartsFragmentDoc = gql`
    fragment BioParts on Bio {
  __typename
  subtitle
  headline
  bioParagraph1
  bioParagraph2
}
    `;
export const EventsPartsFragmentDoc = gql`
    fragment EventsParts on Events {
  __typename
  category
  title
  description
}
    `;
export const PublicationsPartsFragmentDoc = gql`
    fragment PublicationsParts on Publications {
  __typename
  type
  title
  description
  link
}
    `;
export const BioDocument = gql`
    query bio($relativePath: String!) {
  bio(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...BioParts
  }
}
    ${BioPartsFragmentDoc}`;
export const BioConnectionDocument = gql`
    query bioConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: BioFilter) {
  bioConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...BioParts
      }
    }
  }
}
    ${BioPartsFragmentDoc}`;
export const EventsDocument = gql`
    query events($relativePath: String!) {
  events(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...EventsParts
  }
}
    ${EventsPartsFragmentDoc}`;
export const EventsConnectionDocument = gql`
    query eventsConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: EventsFilter) {
  eventsConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...EventsParts
      }
    }
  }
}
    ${EventsPartsFragmentDoc}`;
export const PublicationsDocument = gql`
    query publications($relativePath: String!) {
  publications(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...PublicationsParts
  }
}
    ${PublicationsPartsFragmentDoc}`;
export const PublicationsConnectionDocument = gql`
    query publicationsConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PublicationsFilter) {
  publicationsConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...PublicationsParts
      }
    }
  }
}
    ${PublicationsPartsFragmentDoc}`;
export function getSdk(requester) {
  return {
    bio(variables, options) {
      return requester(BioDocument, variables, options);
    },
    bioConnection(variables, options) {
      return requester(BioConnectionDocument, variables, options);
    },
    events(variables, options) {
      return requester(EventsDocument, variables, options);
    },
    eventsConnection(variables, options) {
      return requester(EventsConnectionDocument, variables, options);
    },
    publications(variables, options) {
      return requester(PublicationsDocument, variables, options);
    },
    publicationsConnection(variables, options) {
      return requester(PublicationsConnectionDocument, variables, options);
    }
  };
}
import { createClient } from "tinacms/dist/client";
const generateRequester = (client) => {
  const requester = async (doc, vars, options) => {
    let url = client.apiUrl;
    if (options?.branch) {
      const index = client.apiUrl.lastIndexOf("/");
      url = client.apiUrl.substring(0, index + 1) + options.branch;
    }
    const data = await client.request({
      query: doc,
      variables: vars,
      url
    }, options);
    return { data: data?.data, errors: data?.errors, query: doc, variables: vars || {} };
  };
  return requester;
};
export const ExperimentalGetTinaClient = () => getSdk(
  generateRequester(
    createClient({
      url: "https://content.tinajs.io/1.6/content/95de2861-b5ae-4ae0-953d-0a1e36e402d9/github/main",
      queries
    })
  )
);
export const queries = (client) => {
  const requester = generateRequester(client);
  return getSdk(requester);
};
