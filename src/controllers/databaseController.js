const { Pool, Client } = require('pg');
const pool = new Pool();

const insert = async (tracks) => {
    console.log('Connecting to database');
    const client = await pool.connect();
    try {
        console.log('Connected to database');
        const lastPlayed = await client.query(`
            SELECT "played_at_timestamp"
            FROM rawdata.listened_musics
            ORDER BY "played_at_timestamp" DESC
            LIMIT 1;
        `)
    
        const lastPlayedDate = lastPlayed.rows[0] ? lastPlayed.rows[0].played_at_timestamp : 0;
        const filteredTracks = tracks.filter(track => track.played_at_timestamp > lastPlayedDate);
        console.log('LastPlayedDate => ' + lastPlayedDate)
        console.log('FilteredTracks length => ' + filteredTracks.length)
        const promises = [];
        filteredTracks.forEach(track => {
            promises.push(client.query(`
                INSERT INTO rawdata.listened_musics 
                (played_at_timestamp, played_at_date, played_at, context_type, context_uri, artist_id, artist_name, 
                    album_id, album_name, album_release_date, album_image_url, track_id, track_type, track_name, track_duration_ms)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
            `, Object.values(track)));
        })
        console.log('Waiting for queries');
        await Promise.all(promises.map(p => p.catch(e => e)));
        console.log('Closing connection');
        await client.release();
        console.log('Client connection ended');
    } catch(e) {
        console.error(e)
        await client.release();
    }
    
}

module.exports = {
    insert
}