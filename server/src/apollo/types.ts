import { gql } from "apollo-server-express";

export default gql`
  type Images {
    default: String
    featured: String
    thumbnail: String
    wide: String
  }

  type Podcast {
    id: String
    title: String
    images: Images
    isExclusive: Boolean
    publisherName: String
    publisherId: String
    mediaType: String
    description: String
    categoryId: String
    categoryName: String
    hasFreeEpisodes: Boolean
    playSequence: String
  }

  type HeartbeatResponse {
    status: String!
    message: String!
  }

  input PodcastsQuery {
    title: String
    categoryName: String
    search: String
    page: Int
    limit: Int
    p: Int
    l: Int
  }

  type Query {
    podcasts(query: PodcastsQuery): [Podcast!]!
    heartbeat: HeartbeatResponse
  }
`;
