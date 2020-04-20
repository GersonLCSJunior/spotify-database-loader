const parse = (file) => {
    const content = JSON.parse(file.Body.toString());
    const tracks = content.map(entry => {
        const track = entry.track;
        return {
            played_at_timestamp: new Date(entry.played_at).getTime(),
            played_at_date: new Date(entry.played_at),
            played_at: entry.played_at,
            context_type: entry.context ? entry.context.type : null,
            context_uri: entry.context ? entry.context.uri : null,
            artist_id: track.artists[0].id,
            artist_name: track.artists[0].name,
            album_id: track.album ? track.album.id : null,
            album_name: track.album ? track.album.name : null,
            album_release_date: track.album ? track.album.release_date : null,
            album_image_url: track.album ? track.album.images[0].url : null,
            track_id: track.id,
            track_type: track.type,
            track_name: track.name,
            track_duration_ms: track.duration_ms
        }
    })
    return tracks;
}

module.exports = {
    parse
}