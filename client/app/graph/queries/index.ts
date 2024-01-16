import { gql } from "@apollo/client";

export const GET_HEARTBEAT = gql`
  query GetHeartBeat {
    heartbeat {
      status
      message
    }
  }
`;

export const GET_PODCASTS = gql`
  query GetPodcasts($query: PodcastsQuery) {
    podcasts(query: $query) {
      title
      images {
        default
        featured
        thumbnail
        wide
      }
      isExclusive
      publisherName
      publisherId
      mediaType
      description
      categoryId
      categoryName
      hasFreeEpisodes
      playSequence
    }
  }
`;
