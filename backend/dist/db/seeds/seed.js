"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connect_1 = require("../connect");
const auth_1 = require("../../helpers/auth");
const user_actions_1 = require("../actions/user-actions"); // NEEDED FOR PROPERLY ESTABLISH USERS DUE TO PRE-MIDDLEWARE IN SCHEMA
async function seedDatabase() {
    try {
        const db = await (0, connect_1.connectToMongoDB)(); // establish connection to database
        //? UNSEED DB BEFORE SEEDING
        await db.collection("users").deleteMany({});
        await db.collection("artists").deleteMany({});
        await db.collection("albums").deleteMany({});
        await db.collection("tracks").deleteMany({});
        await db.collection("playlists").deleteMany({});
        //? SEED USERS COLLECTION
        const saltUser1 = (0, auth_1.random)();
        const saltUser2 = (0, auth_1.random)();
        const saltUser3 = (0, auth_1.random)();
        await (0, user_actions_1.createUser)({
            email: "sebastianstovall@gmail.com",
            username: "SebassStovall",
            authentication: {
                salt: saltUser1,
                password: (0, auth_1.authentication)(saltUser1, 'password'), // store salted password in the database
            },
        });
        await (0, user_actions_1.createUser)({
            email: "foo@gmail.com",
            username: "Foo",
            authentication: {
                salt: saltUser2,
                password: (0, auth_1.authentication)(saltUser2, 'password'), // store salted password in the database
            },
        });
        await (0, user_actions_1.createUser)({
            email: "bar@gmail.com",
            username: "Bar",
            authentication: {
                salt: saltUser3,
                password: (0, auth_1.authentication)(saltUser3, 'password'), // store salted password in the database
            },
        });
        //? SEED ARTISTS
        const artists = [
            {
                name: '$uicideBoy$',
                image: 'https://placeholder.jpg',
                monthlyListeners: 11216508,
                description: "$uicideboy$ dig light out of the deepest corners of darkness, addiction, hopelessness, and pain. The New Orleans-bred duo of cousins—Scott Arcenaux, Jr. a.k.a. $crim and Aristos Petrou a.k.a. Ruby da Cherry—translate a fight against demons (seen and unseen) into a clever, caustic, and corrosively catchy apocalyptic vision of hip-hop pierced with punk intensity and laced with Southern flows. After releasing dozens of projects and playing hundreds of sold-out shows since 2014, they’ve generated billions of streams and earned multiple RIAA certifications, including the platinum “…And To Those I Love, Thanks For Sticking Around” and gold “Carrollton,” “2nd Hand,” “Runnin’ Thru The 7th With My Woadies,” “Paris,” and “Kill Yourself (Part III).” Beyond their critical-acclaim from Billboard, XXL, Alternative Press, Pigeons and Planes, Hypebeast, Revolver, and more, they built their label G*59 Records into a bastion of independent talent and home to Night Lovell, Shakewell, Germ, Ramirez, and others. In 2022, the punk-rap duo landed in the Top 30 most-streamed artists across all genres and have climbed to the 92nd position of most-streamed artists of all-time with over 15 billion career streams. Their third official full-length LP Sing Me A Lullaby, My Sweet Temptation marked their 3rd consecutive Top 10 album debut on the Billboard Top 200. The album led to a 50-city US arena and amphitheater tour followed by a European tour and a top-billed spot at Coachella music festival in 2023"
            },
            {
                name: 'Kanye West',
                image: 'https://placeholder.jpg',
                monthlyListeners: 64191521,
                description: "One of the most influential, critically-lauded, and controversial artists of the early 21st century, American rapper and producer Kanye West went from hip-hop beatmaker to worldwide hitmaker with a wildly successful solo career that counted an unbroken string of chart-topping, multi-platinum albums and nearly two-dozen Grammy Awards. His early 2000s production work quickly led to a major-label recording contract, yielding a classic trilogy comprised of 2004's The College Dropout, 2005's Late Registration, and 2007's Graduation. With each successive album, he pushed the boundaries of hip-hop and soon entered a new phase of artistry with game changers such as 2008's 808s & Heartbreak, 2010's widely-regarded magnum opus My Beautiful Dark Twisted Fantasy, and 2013's industrial-leaning foray Yeezus. Celebrity, tabloid headlines, and a changing artistic vision informed much of his next era, as the trappings of fame and inner turmoil became the focus of chart-toppers such as The Life of Pablo and Ye. He even released a gospel album, Jesus Is King, in 2019. As his outspoken personality and political statements began to eclipse his music into the 2020s, he still managed to top the charts and garner accolades with 2020's exploratory Donda. In 2023, West joined forces with  to form new project ¥$, the duo working towards the release of their debut album Vultures."
            },
            {
                name: 'Eminem',
                image: 'https://placeholder.jpg',
                monthlyListeners: 72027242,
                description: "Apart from being one of the best-selling artists in music history, Eminem is one of the greatest rappers of his generation: effortlessly fast, fluid, dexterous, and unpredictable, capable of pulling off long-form narratives or withering asides. And thanks to his mentor , he's had music to match: thick, muscular loops evoking the terror and paranoia conjured by his lyrics. To be certain, a great deal of the controversy Eminem courted came through in how his violent fantasias, often directed at his mother or his wife, intertwined with flights of absurdity that appealed to listeners too young to absorb the psychodramas explored on his breakthrough albums The Slim Shady LP and The Marshall Mathers LP. Eminem's commercial peak came around the time of his 2002 album The Eminem Show (which went platinum 27 times over) and with his crossover onto the big screen that same year with 8 Mile, a film that earned him acclaim for his performance and an Oscar for the film's anthem, 'Lose Yourself.' Eminem's journey as a living rap legend included struggles with addiction, near-constant feuding with other artists, and a celebrity status that shifted as the years went on. Through all his various changes, however, he continued growing as an artist as well as consistently hitting high commercial marks. Though critics could be unkind to efforts like 2009's Relapse or 2017's Revival, fans made sure that each new album sold at least platinum numbers and topped the charts. Instead of recycling old ideas, the rapper experimented with new production approaches, faster flows, and increasingly complex multisyllabic wordplay on projects like 2020's Music to Be Murdered By."
            },
            {
                name: 'Hensonn',
                image: 'https://placeholder.jpg',
                monthlyListeners: 4153680,
                description: "Hey I'm Artem , known professionally as 'Hensonn', staked his claim in the Phonk community with his 2021 TikTok viral record 'Sahara'. Born in Ukraine, his unique approach to Phonk production has amassed him tens of millions of streams across all platforms."
            },
            {
                name: 'fkbambam',
                image: 'https://placeholder.jpg',
                monthlyListeners: 851181,
                description: "just calm down // ig: @fkbambam"
            },
        ];
        await db.collection("artists").insertMany(artists);
        // ----------------------------------------------------------------------------------------------------------------------------------------------------------- //
        /* artist Ids ---> */ const artistRefs = (await db.collection("artists").find({}).project({ _id: 1 }).toArray()).map(artist => artist._id);
        //! ATTACH "Artist" REFS TO "Albums"
        //? SEED ALBUMS
        const albums = [
            // $uicideboy$
            { title: 'I No Longer Fear The Razor Guarding My Heel (V)',
                artistName: '$uicideboy$',
                artist: artistRefs[0],
                yearReleased: 2023,
                image: 'https://example-image.jpg', // AWS
                length: '7 min 34 sec'
            },
            { title: 'YIN YANG TAPES: Spring Season (1989-1990)',
                artistName: '$uicideboy$',
                artist: artistRefs[0],
                yearReleased: 2023,
                image: 'https://example-image.jpg', // AWS
                length: '10 min'
            },
            // Kanye West
            { title: 'Graduation',
                artistName: 'Kanye West',
                artist: artistRefs[1],
                yearReleased: 2007,
                image: 'https://example-image.jpg', // AWS
                length: '54 min 29 sec'
            },
            { title: '808s & Heartbreak',
                artistName: 'Kanye West',
                artist: artistRefs[1],
                yearReleased: 2008,
                image: 'https://example-image.jpg', // AWS
                length: '52 min 5 sec'
            },
            // Eminem
            { title: 'Recovery',
                artistName: 'Eminem',
                artist: artistRefs[2],
                yearReleased: 2010,
                image: 'https://example-image.jpg', // AWS
                length: '1hr 17min'
            },
            { title: 'The Marshall Mathers LP2',
                artistName: 'Eminem',
                artist: artistRefs[2],
                yearReleased: 2013,
                image: 'https://example-image.jpg', // AWS
                length: '1hr 42 min'
            },
            // Hensonn
            { title: 'Fear',
                artistName: 'Hensonn',
                artist: artistRefs[3],
                yearReleased: 2023,
                image: 'https://example-image.jpg', // AWS
                length: '2 min 11 sec'
            },
            { title: 'Sahara',
                artistName: 'Hensonn',
                artist: artistRefs[3],
                yearReleased: 2021,
                image: 'https://example-image.jpg', // AWS
                length: '2 min 51 sec'
            },
            // fkbambam
            { title: 'KILLKA',
                artistName: 'fkbambam',
                artist: artistRefs[4],
                yearReleased: 2021,
                image: 'https://example-image.jpg', // AWS
                length: '14 min 29 sec'
            },
            { title: 'VACATION',
                artistName: 'fkbambam',
                artist: artistRefs[4],
                yearReleased: 2020,
                image: 'https://example-image.jpg', // AWS
                length: '1 min 56 sec'
            },
        ];
        await db.collection("albums").insertMany(albums);
        // ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
        //! ATTACH 'Album' REFS TO 'Artist' HERE:
        /* album Ids ---> */ const albumRefs = (await db.collection("albums").find({}).project({ _id: 1 }).toArray()).map(album => album._id);
        // $uicideboy$
        await db.collection('artists').updateOne({ _id: artistRefs[0] }, { $set: { discography: [albumRefs[0], albumRefs[1]] } });
        // Kanye West
        await db.collection('artists').updateOne({ _id: artistRefs[1] }, { $set: { discography: [albumRefs[2], albumRefs[3]] } });
        // Eminem
        await db.collection('artists').updateOne({ _id: artistRefs[2] }, { $set: { discography: [albumRefs[4], albumRefs[5]] } });
        // Hensonn
        await db.collection('artists').updateOne({ _id: artistRefs[3] }, { $set: { discography: [albumRefs[6], albumRefs[7]] } });
        // fkbambam
        await db.collection('artists').updateOne({ _id: artistRefs[4] }, { $set: { discography: [albumRefs[8], albumRefs[9]] } });
        //? SEED TRACKS
        //! ATTACH 'Artist' + 'Album' TO TRACKS
        const tracks = [
            // I No Longer Fear The Razor Guarding My Heel (V)
            {
                title: "Not Even Ghosts Are This Empty",
                length: "3:00",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 42268454,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[0],
                artistName: '$uicideboy$',
                album: albumRefs[0],
                albumName: 'I No Longer Fear The Razor Guarding My Heel (V)'
            },
            {
                title: "Finding Shelter In My Larynx",
                length: "2:20",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 19376796,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[0],
                artistName: '$uicideboy$',
                album: albumRefs[0],
                albumName: 'I No Longer Fear The Razor Guarding My Heel (V)'
            },
            {
                title: "A Little Trauma Can Be Illuminating, And I'm Shining Like The Sun",
                length: "2:13",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 27886693,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[0],
                artistName: '$uicideboy$',
                album: albumRefs[0],
                albumName: 'I No Longer Fear The Razor Guarding My Heel (V)'
            },
            // YIN YANG TAPES: Summer Season (1989-1990)
            {
                title: "Summer Season Intro",
                length: "0:40",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 1912710,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[0],
                artistName: '$uicideboy$',
                album: albumRefs[1],
                albumName: 'YIN YANG TAPES: Summer Season (1989-1990)'
            },
            {
                title: "5 'N the Mornin'",
                length: "4:26",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 9983499,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[0],
                artistName: '$uicideboy$',
                album: albumRefs[1],
                albumName: 'YIN YANG TAPES: Summer Season (1989-1990)'
            },
            {
                title: "Starry 9",
                length: "2:39",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 6216354,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[0],
                artistName: '$uicideboy$',
                album: albumRefs[1],
                albumName: 'YIN YANG TAPES: Summer Season (1989-1990)'
            },
            {
                title: "Bloody 98 (Feat. Ghostmane)",
                length: "4:37",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 20227858,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[0],
                artistName: '$uicideboy$',
                album: albumRefs[1],
                albumName: 'YIN YANG TAPES: Summer Season (1989-1990)'
            },
            // Graduation
            {
                title: "Good Morning",
                length: "3:15",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 272276775,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[1],
                artistName: 'Kanye West',
                album: albumRefs[2],
                albumName: 'Graduation'
            },
            {
                title: "Champion",
                length: "2:47",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 184949937,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[1],
                artistName: 'Kanye West',
                album: albumRefs[2],
                albumName: 'Graduation'
            },
            {
                title: "Stronger",
                length: "5:11",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 1302723304,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[1],
                artistName: 'Kanye West',
                album: albumRefs[2],
                albumName: 'Graduation'
            },
            {
                title: "I Wonder",
                length: "4:03",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 575633353,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[1],
                artistName: 'Kanye West',
                album: albumRefs[2],
                albumName: 'Graduation'
            },
            {
                title: "Good Life",
                length: "3:27",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 383921280,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[1],
                artistName: 'Kanye West',
                album: albumRefs[2],
                albumName: 'Graduation'
            },
            {
                title: "Can't Tell Me Nothing",
                length: "4:31",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 490821294,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[1],
                artistName: 'Kanye West',
                album: albumRefs[2],
                albumName: 'Graduation'
            },
            {
                title: "Barry Bonds",
                length: "3:24",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 56760640,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[1],
                artistName: 'Kanye West',
                album: albumRefs[2],
                albumName: 'Graduation'
            },
            {
                title: "Drunk and Hot Girls",
                length: "5:13",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 50008455,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[1],
                artistName: 'Kanye West',
                album: albumRefs[2],
                albumName: 'Graduation'
            },
            {
                title: "Flashing Lights",
                length: "3:57",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 875401287,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[1],
                artistName: 'Kanye West',
                album: albumRefs[2],
                albumName: 'Graduation'
            },
            {
                title: "Everything I Am",
                length: "3:47",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 180152731,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[1],
                artistName: 'Kanye West',
                album: albumRefs[2],
                albumName: 'Graduation'
            },
            {
                title: "The Glory",
                length: "3:32",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 73851938,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[1],
                artistName: 'Kanye West',
                album: albumRefs[2],
                albumName: 'Graduation'
            },
            {
                title: "Homecoming",
                length: "3:23",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 552626848,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[1],
                artistName: 'Kanye West',
                album: albumRefs[2],
                albumName: 'Graduation'
            },
            {
                title: "Big Brother",
                length: "4:47",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 58523882,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[1],
                artistName: 'Kanye West',
                album: albumRefs[2],
                albumName: 'Graduation'
            },
            {
                title: "Good Night",
                length: "3:05",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 26347080,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[1],
                artistName: 'Kanye West',
                album: albumRefs[2],
                albumName: 'Graduation'
            },
            // 808s & Heartbreak
            {
                title: "Say You Will",
                length: "6:17",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 42373107,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[1],
                artistName: 'Kanye West',
                album: albumRefs[3],
                albumName: '808s & Heartbreak'
            },
            {
                title: "Welcome To Heartbreak",
                length: "4:22",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 75304097,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[1],
                artistName: 'Kanye West',
                album: albumRefs[3],
                albumName: '808s & Heartbreak'
            },
            {
                title: "Heartless",
                length: "3:31",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 1075586037,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[1],
                artistName: 'Kanye West',
                album: albumRefs[3],
                albumName: '808s & Heartbreak'
            },
            {
                title: "Amazing",
                length: "3:58",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 151231670,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[1],
                artistName: 'Kanye West',
                album: albumRefs[3],
                albumName: '808s & Heartbreak'
            },
            {
                title: "Love Lockdown",
                length: "4:30",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 189617906,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[1],
                artistName: 'Kanye West',
                album: albumRefs[3],
                albumName: '808s & Heartbreak'
            },
            {
                title: "Paranoid",
                length: "4:47",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 89871396,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[1],
                artistName: 'Kanye West',
                album: albumRefs[3],
                albumName: '808s & Heartbreak'
            },
            {
                title: "RoboCop",
                length: "4:34",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 39091814,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[1],
                artistName: 'Kanye West',
                album: albumRefs[3],
                albumName: '808s & Heartbreak'
            },
            {
                title: "Street Lights",
                length: "3:09",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 69516857,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[1],
                artistName: 'Kanye West',
                album: albumRefs[3],
                albumName: '808s & Heartbreak'
            },
            {
                title: "Bad News",
                length: "3:58",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 34326302,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[1],
                artistName: 'Kanye West',
                album: albumRefs[3],
                albumName: '808s & Heartbreak'
            },
            {
                title: "See You In My Nightmares",
                length: "4:18",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 38991772,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[1],
                artistName: 'Kanye West',
                album: albumRefs[3],
                albumName: '808s & Heartbreak'
            },
            {
                title: "Coldest Winter",
                length: "2:44",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 42550668,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[1],
                artistName: 'Kanye West',
                album: albumRefs[3],
                albumName: '808s & Heartbreak'
            },
            {
                title: "Pinocchio Story",
                length: "6:01",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 17627403,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[1],
                artistName: 'Kanye West',
                album: albumRefs[3],
                albumName: '808s & Heartbreak'
            },
            // Recovery
            {
                title: "Cold Wind Blows",
                length: "5:03",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 102638408,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[2],
                artistName: 'Eminem',
                album: albumRefs[4],
                albumName: 'Recovery'
            },
            {
                title: "Talkin' 2 Myself",
                length: "5:00",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 87048847,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[2],
                artistName: 'Eminem',
                album: albumRefs[4],
                albumName: 'Recovery'
            },
            {
                title: "On Fire",
                length: "3:33",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 54016464,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[2],
                artistName: 'Eminem',
                album: albumRefs[4],
                albumName: 'Recovery'
            },
            {
                title: "Won't Back Down",
                length: "4:25",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 102202067,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[2],
                artistName: 'Eminem',
                album: albumRefs[4],
                albumName: 'Recovery'
            },
            {
                title: "W.T.P",
                length: "3:58",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 99806700,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[2],
                artistName: 'Eminem',
                album: albumRefs[4],
                albumName: 'Recovery'
            },
            {
                title: "Going Through Changes",
                length: "4:58",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 72584879,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[2],
                artistName: 'Eminem',
                album: albumRefs[4],
                albumName: 'Recovery'
            },
            {
                title: "Not Afraid",
                length: "4:08",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 936886632,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[2],
                artistName: 'Eminem',
                album: albumRefs[4],
                albumName: 'Recovery'
            },
            {
                title: "Seduction",
                length: "4:35",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 54463079,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[2],
                artistName: 'Eminem',
                album: albumRefs[4],
                albumName: 'Recovery'
            },
            {
                title: "No Love",
                length: "4:59",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 311027582,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[2],
                artistName: 'Eminem',
                album: albumRefs[4],
                albumName: 'Recovery'
            },
            {
                title: "Space Bound",
                length: "4:38",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 293785698,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[2],
                artistName: 'Eminem',
                album: albumRefs[4],
                albumName: 'Recovery'
            },
            {
                title: "Cinderella Man",
                length: "4:39",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 297045840,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[2],
                artistName: 'Eminem',
                album: albumRefs[4],
                albumName: 'Recovery'
            },
            {
                title: "25 To Life",
                length: "4:01",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 143833512,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[2],
                artistName: 'Eminem',
                album: albumRefs[4],
                albumName: 'Recovery'
            },
            {
                title: "So Bad",
                length: "5:25",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 76770691,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[2],
                artistName: 'Eminem',
                album: albumRefs[4],
                albumName: 'Recovery'
            },
            {
                title: "Almost Famous",
                length: "4:52",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 50811026,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[2],
                artistName: 'Eminem',
                album: albumRefs[4],
                albumName: 'Recovery'
            },
            {
                title: "Love The Way You Lie",
                length: "4:23",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 1362035134,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[2],
                artistName: 'Eminem',
                album: albumRefs[4],
                albumName: 'Recovery'
            },
            {
                title: "You're Never Over",
                length: "5:05",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 47526797,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[2],
                artistName: 'Eminem',
                album: albumRefs[4],
                albumName: 'Recovery'
            },
            {
                title: "Untitled",
                length: "3:14",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 48294022,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[2],
                artistName: 'Eminem',
                album: albumRefs[4],
                albumName: 'Recovery'
            },
            // The Marshall Mathers LP2
            {
                title: "Bad Guy",
                length: "7:14",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 111307418,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[2],
                artistName: 'Eminem',
                album: albumRefs[5],
                albumName: 'The Marshall Mathers LP2'
            },
            {
                title: "Parking Lot - Skit",
                length: "0:55",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 27942209,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[2],
                artistName: 'Eminem',
                album: albumRefs[5],
                albumName: 'The Marshall Mathers LP2'
            },
            {
                title: "Rhyme Or Reason",
                length: "5:01",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 61537298,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[2],
                artistName: 'Eminem',
                album: albumRefs[5],
                albumName: 'The Marshall Mathers LP2'
            },
            {
                title: "So Much Better",
                length: "4:21",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 56155413,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[2],
                artistName: 'Eminem',
                album: albumRefs[5],
                albumName: 'The Marshall Mathers LP2'
            },
            {
                title: "Survival",
                length: "4:32",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 248959425,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[2],
                artistName: 'Eminem',
                album: albumRefs[5],
                albumName: 'The Marshall Mathers LP2'
            },
            {
                title: "Legacy",
                length: "4:56",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 147875131,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[2],
                artistName: 'Eminem',
                album: albumRefs[5],
                albumName: 'The Marshall Mathers LP2'
            },
            {
                title: "Asshole",
                length: "4:48",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 56948495,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[2],
                artistName: 'Eminem',
                album: albumRefs[5],
                albumName: 'The Marshall Mathers LP2'
            },
            {
                title: "Berzerk",
                length: "3:58",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 294646323,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[2],
                artistName: 'Eminem',
                album: albumRefs[5],
                albumName: 'The Marshall Mathers LP2'
            },
            {
                title: "Rap God",
                length: "6:03",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 1024452496,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[2],
                artistName: 'Eminem',
                album: albumRefs[5],
                albumName: 'The Marshall Mathers LP2'
            },
            {
                title: "Brainless",
                length: "4:46",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 52372632,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[2],
                artistName: 'Eminem',
                album: albumRefs[5],
                albumName: 'The Marshall Mathers LP2'
            },
            {
                title: "Stronger Than I Was",
                length: "5:36",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 62403834,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[2],
                artistName: 'Eminem',
                album: albumRefs[5],
                albumName: 'The Marshall Mathers LP2'
            },
            {
                title: "The Monster",
                length: "4:10",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 944989922,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[2],
                artistName: 'Eminem',
                album: albumRefs[5],
                albumName: 'The Marshall Mathers LP2'
            },
            {
                title: "So Far...",
                length: "5:17",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 51964465,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[2],
                artistName: 'Eminem',
                album: albumRefs[5],
                albumName: 'The Marshall Mathers LP2'
            },
            {
                title: "Love Game",
                length: "4:56",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 68940145,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[2],
                artistName: 'Eminem',
                album: albumRefs[5],
                albumName: 'The Marshall Mathers LP2'
            },
            {
                title: "Headlights",
                length: "5:43",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 149138309,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[2],
                artistName: 'Eminem',
                album: albumRefs[5],
                albumName: 'The Marshall Mathers LP2'
            },
            {
                title: "Evil Twin - Skit",
                length: "7:33",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 9110651,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[2],
                artistName: 'Eminem',
                album: albumRefs[5],
                albumName: 'The Marshall Mathers LP2'
            },
            // Fear
            {
                title: "Fear",
                length: "2:11",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 19172205,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[3],
                artistName: 'Hensonn',
                album: albumRefs[6],
                albumName: 'Fear'
            },
            // Sahara
            {
                title: "Sahara",
                length: "2:51",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 246129400,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[3],
                artistName: 'Hensonn',
                album: albumRefs[7],
                albumName: 'Sahara'
            },
            // KILLKA
            {
                title: "KILLKA",
                length: "2:22",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 47259289,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[4],
                artistName: 'fkbambam',
                album: albumRefs[8],
                albumName: 'KILLKA'
            },
            // VACATION
            {
                title: "VACATION",
                length: "1:56",
                audio: "<MP3 AUDIO HERE>", // AWS
                image: 'https://track-image.jpg',
                plays: 15677488,
                artistImage: 'https://artist-image.jpg',
                artist: artistRefs[4],
                artistName: 'fkbambam',
                album: albumRefs[9],
                albumName: 'VACATION'
            },
        ];
        await db.collection("tracks").insertMany(tracks);
        // --------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
        /* track Ids ---> */ const trackRefs = (await db.collection("tracks").find({}).project({ _id: 1 }).toArray()).map(track => track._id);
        // *! ATTACH 'Track' REFS TO 'Album'
        // I No Longer Fear The Razor Guarding My Heel (V) (3 songs)
        await db.collection('albums').updateOne({ _id: albumRefs[0] }, { $set: { tracks: [trackRefs[0], trackRefs[1], trackRefs[2]] } });
        // YIN YANG TAPES: Summer Season (1989-1990) (4 songs)
        await db.collection('albums').updateOne({ _id: albumRefs[1] }, { $set: { tracks: [trackRefs[3], trackRefs[4], trackRefs[5], trackRefs[6]] } });
        // Graduation (14 songs)
        await db.collection('albums').updateOne({ _id: albumRefs[2] }, { $set: { tracks: [trackRefs[7], trackRefs[8], trackRefs[9], trackRefs[10], trackRefs[11], trackRefs[12], trackRefs[13], trackRefs[14], trackRefs[15], trackRefs[16], trackRefs[17], trackRefs[18], trackRefs[19], trackRefs[20]] } });
        // 808s & Heartbreak (12 songs)
        await db.collection('albums').updateOne({ _id: albumRefs[3] }, { $set: { tracks: [trackRefs[21], trackRefs[22], trackRefs[23], trackRefs[24], trackRefs[25], trackRefs[26], trackRefs[27], trackRefs[28], trackRefs[29], trackRefs[30], trackRefs[31], trackRefs[32]] } });
        // Recovery (17 songs)
        await db.collection('albums').updateOne({ _id: albumRefs[4] }, { $set: { tracks: [trackRefs[33], trackRefs[34], trackRefs[35], trackRefs[36], trackRefs[37], trackRefs[38], trackRefs[39], trackRefs[40], trackRefs[41], trackRefs[42], trackRefs[43], trackRefs[44], trackRefs[45], trackRefs[46], trackRefs[47], trackRefs[48], trackRefs[49]] } });
        // The Marshall Mathers LP2 (16 songs)
        await db.collection('albums').updateOne({ _id: albumRefs[5] }, { $set: { tracks: [trackRefs[50], trackRefs[51], trackRefs[52], trackRefs[53], trackRefs[54], trackRefs[55], trackRefs[56], trackRefs[57], trackRefs[58], trackRefs[59], trackRefs[60], trackRefs[61], trackRefs[62], trackRefs[63], trackRefs[64], trackRefs[65]] } });
        // Fear (1 song)
        await db.collection('albums').updateOne({ _id: albumRefs[6] }, { $set: { tracks: [trackRefs[66]] } });
        // Sahara
        await db.collection('albums').updateOne({ _id: albumRefs[7] }, { $set: { tracks: [trackRefs[67]] } });
        // KILLKA
        await db.collection('albums').updateOne({ _id: albumRefs[8] }, { $set: { tracks: [trackRefs[68]] } });
        // VACATION
        await db.collection('albums').updateOne({ _id: albumRefs[9] }, { $set: { tracks: [trackRefs[69]] } });
        console.log('Database seeded successfully.');
        return;
    }
    catch (error) {
        // If an error occurs, close the connection
        console.error('Error seeding the database:', error);
        await (0, connect_1.disconnectFromMongoDB)();
        throw error;
    }
}
seedDatabase();
