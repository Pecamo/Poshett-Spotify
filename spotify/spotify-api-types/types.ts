export interface CurrentPlaybackState {
  device:
    {
      id: string,
      is_active: boolean,
      is_private_session: boolean,
      is_restricted: boolean,
      name: string,
      type: string,
      volume_percent: number
    },
  shuffle_state: boolean,
  repeat_state: string,
  timestamp: number,
  context:
    {
      external_urls:
        { spotify: string },
      href: string,
      type: string,
      uri: string
    },
  progress_ms: number,
  item:
    {
      album:
        {
          album_type: string,
          artists: Array<any>,
          available_markets: Array<any>,
          external_urls: Array<object>,
          href: string,
          id: string
          images: Array<any>,
          name: string,
          release_date: string,
          release_date_precision: string,
          total_tracks: number,
          type: string,
          uri: string
        },
      artists: Array<any>,
      available_markets: Array<string>
      disc_number: number,
      duration_ms: number,
      explicit: boolean,
      external_ids: { isrc: string },
      external_urls:
        { spotify: string },
      href: string,
      id: string,
      is_local: boolean,
      name: string,
      popularity: number,
      preview_url: string,
      track_number: number,
      type: string,
      uri: string
    },
  currently_playing_type: string,
  is_playing: boolean
}
