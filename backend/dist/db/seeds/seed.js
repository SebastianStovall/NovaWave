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
        /* user Ids ---> */ const userRefs = (await db.collection("users").find({}).project({ _id: 1 }).toArray()).map(user => user._id);
        //? SEED ARTISTS
        const artists = [
            {
                name: '$uicideBoy$',
                bannerImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-images/%24B-Banner-Artist.jfif',
                aboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/%24B-ABOUT-Artist-1.jfif',
                monthlyListeners: 11216508,
                description: "$uicideboy$ dig light out of the deepest corners of darkness, addiction, hopelessness, and pain. The New Orleans-bred duo of cousins—Scott Arcenaux, Jr. a.k.a. $crim and Aristos Petrou a.k.a. Ruby da Cherry—translate a fight against demons (seen and unseen) into a clever, caustic, and corrosively catchy apocalyptic vision of hip-hop pierced with punk intensity and laced with Southern flows. After releasing dozens of projects and playing hundreds of sold-out shows since 2014, they’ve generated billions of streams and earned multiple RIAA certifications, including the platinum “…And To Those I Love, Thanks For Sticking Around” and gold “Carrollton,” “2nd Hand,” “Runnin’ Thru The 7th With My Woadies,” “Paris,” and “Kill Yourself (Part III).” Beyond their critical-acclaim from Billboard, XXL, Alternative Press, Pigeons and Planes, Hypebeast, Revolver, and more, they built their label G*59 Records into a bastion of independent talent and home to Night Lovell, Shakewell, Germ, Ramirez, and others. In 2022, the punk-rap duo landed in the Top 30 most-streamed artists across all genres and have climbed to the 92nd position of most-streamed artists of all-time with over 15 billion career streams. Their third official full-length LP Sing Me A Lullaby, My Sweet Temptation marked their 3rd consecutive Top 10 album debut on the Billboard Top 200. The album led to a 50-city US arena and amphitheater tour followed by a European tour and a top-billed spot at Coachella music festival in 2023"
            },
            {
                name: 'Kanye West',
                bannerImage: '',
                aboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/Kanye-West-ABOUT-Artist-2.jfif',
                monthlyListeners: 64191521,
                description: "One of the most influential, critically-lauded, and controversial artists of the early 21st century, American rapper and producer Kanye West went from hip-hop beatmaker to worldwide hitmaker with a wildly successful solo career that counted an unbroken string of chart-topping, multi-platinum albums and nearly two-dozen Grammy Awards. His early 2000s production work quickly led to a major-label recording contract, yielding a classic trilogy comprised of 2004's The College Dropout, 2005's Late Registration, and 2007's Graduation. With each successive album, he pushed the boundaries of hip-hop and soon entered a new phase of artistry with game changers such as 2008's 808s & Heartbreak, 2010's widely-regarded magnum opus My Beautiful Dark Twisted Fantasy, and 2013's industrial-leaning foray Yeezus. Celebrity, tabloid headlines, and a changing artistic vision informed much of his next era, as the trappings of fame and inner turmoil became the focus of chart-toppers such as The Life of Pablo and Ye. He even released a gospel album, Jesus Is King, in 2019. As his outspoken personality and political statements began to eclipse his music into the 2020s, he still managed to top the charts and garner accolades with 2020's exploratory Donda. In 2023, West joined forces with  to form new project ¥$, the duo working towards the release of their debut album Vultures."
            },
            {
                name: 'Eminem',
                bannerImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-images/Eminem-Banner-Artist.jfif',
                aboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/Eminem-ABOUT-Artist-3.jfif',
                monthlyListeners: 72027242,
                description: "Apart from being one of the best-selling artists in music history, Eminem is one of the greatest rappers of his generation: effortlessly fast, fluid, dexterous, and unpredictable, capable of pulling off long-form narratives or withering asides. And thanks to his mentor , he's had music to match: thick, muscular loops evoking the terror and paranoia conjured by his lyrics. To be certain, a great deal of the controversy Eminem courted came through in how his violent fantasias, often directed at his mother or his wife, intertwined with flights of absurdity that appealed to listeners too young to absorb the psychodramas explored on his breakthrough albums The Slim Shady LP and The Marshall Mathers LP. Eminem's commercial peak came around the time of his 2002 album The Eminem Show (which went platinum 27 times over) and with his crossover onto the big screen that same year with 8 Mile, a film that earned him acclaim for his performance and an Oscar for the film's anthem, 'Lose Yourself.' Eminem's journey as a living rap legend included struggles with addiction, near-constant feuding with other artists, and a celebrity status that shifted as the years went on. Through all his various changes, however, he continued growing as an artist as well as consistently hitting high commercial marks. Though critics could be unkind to efforts like 2009's Relapse or 2017's Revival, fans made sure that each new album sold at least platinum numbers and topped the charts. Instead of recycling old ideas, the rapper experimented with new production approaches, faster flows, and increasingly complex multisyllabic wordplay on projects like 2020's Music to Be Murdered By."
            },
            {
                name: 'Hensonn',
                bannerImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-images/Hensonn-Banner-Artist.jfif',
                aboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/Hensonn-ABOUT-Artist-4.jfif',
                monthlyListeners: 4153680,
                description: "Hey I'm Artem , known professionally as 'Hensonn', staked his claim in the Phonk community with his 2021 TikTok viral record 'Sahara'. Born in Ukraine, his unique approach to Phonk production has amassed him tens of millions of streams across all platforms."
            },
            {
                name: 'fkbambam',
                bannerImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-images/fkbambam-Banner-Artist.jfif',
                aboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/fkbambam-ABOUT-Artist-5.jfif',
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
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/I-No-Longer-Fear-The-Razor-Guarding-My-Heel-Album-1.jfif', // AWS
                length: '7 min 34 sec',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            { title: 'YIN YANG TAPES: Spring Season (1989-1990)',
                artistName: '$uicideboy$',
                artist: artistRefs[0],
                yearReleased: 2023,
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/Yin-Yang-Tapes-Summer-Season-Album-2.jfif', // AWS
                length: '10 min',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            // Kanye West
            { title: 'Graduation',
                artistName: 'Kanye West',
                artist: artistRefs[1],
                yearReleased: 2007,
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/Graduation-Album-3.jfif', // AWS
                length: '54 min 29 sec',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            { title: '808s & Heartbreak',
                artistName: 'Kanye West',
                artist: artistRefs[1],
                yearReleased: 2008,
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/808s-%26-Heartbreak-Album-4.jfif', // AWS
                length: '52 min 5 sec',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            // Eminem
            { title: 'Recovery',
                artistName: 'Eminem',
                artist: artistRefs[2],
                yearReleased: 2010,
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/Recovery-Album-5.jfif', // AWS
                length: '1hr 17min',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            { title: 'The Marshall Mathers LP2',
                artistName: 'Eminem',
                artist: artistRefs[2],
                yearReleased: 2013,
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/The-Marshall-Mathers-LP2-Album-6.jfif', // AWS
                length: '1hr 42 min',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            // Hensonn
            { title: 'Fear',
                artistName: 'Hensonn',
                artist: artistRefs[3],
                yearReleased: 2023,
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/Fear-Album-7.jfif', // AWS
                length: '2 min 11 sec',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            { title: 'Sahara',
                artistName: 'Hensonn',
                artist: artistRefs[3],
                yearReleased: 2021,
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/Sahara-Album-8.jfif', // AWS
                length: '2 min 51 sec',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            // fkbambam
            { title: 'KILLKA',
                artistName: 'fkbambam',
                artist: artistRefs[4],
                yearReleased: 2021,
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/KILLKA-Album-9.jfif', // AWS
                length: '14 min 29 sec',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            { title: 'VACATION',
                artistName: 'fkbambam',
                artist: artistRefs[4],
                yearReleased: 2020,
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/VACATION-Album-10.jfif', // AWS
                length: '1 min 56 sec',
                createdAt: new Date(),
                updatedAt: new Date()
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
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+Not+Even+Ghosts+Are+This+Empty.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/I-No-Longer-Fear-The-Razor-Guarding-My-Heel-Album-1.jfif',
                plays: 42268454,
                artist: artistRefs[0],
                artistName: '$uicideboy$',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/%24B-ABOUT-Artist-1.jfif',
                artistMonthlyListeners: 11216508,
                album: albumRefs[0],
                albumName: 'I No Longer Fear The Razor Guarding My Heel (V)'
            },
            {
                title: "Finding Shelter In My Larynx",
                length: "2:20",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+Finding+Shelter+In+My+Larynx.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/I-No-Longer-Fear-The-Razor-Guarding-My-Heel-Album-1.jfif',
                plays: 19376796,
                artist: artistRefs[0],
                artistName: '$uicideboy$',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/%24B-ABOUT-Artist-1.jfif',
                artistMonthlyListeners: 11216508,
                album: albumRefs[0],
                albumName: 'I No Longer Fear The Razor Guarding My Heel (V)'
            },
            {
                title: "A Little Trauma Can Be Illuminating, And I'm Shining Like The Sun",
                length: "2:13",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+A+Little+Trauma+Can+Be+Illuminating%2C+And+I'm+Shining+Like+The+Sun.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/I-No-Longer-Fear-The-Razor-Guarding-My-Heel-Album-1.jfif',
                plays: 27886693,
                artist: artistRefs[0],
                artistName: '$uicideboy$',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/%24B-ABOUT-Artist-1.jfif',
                artistMonthlyListeners: 11216508,
                album: albumRefs[0],
                albumName: 'I No Longer Fear The Razor Guarding My Heel (V)'
            },
            // YIN YANG TAPES: Summer Season (1989-1990)
            {
                title: "Summer Season Intro",
                length: "0:40",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+Summer+Season+Intro.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/Yin-Yang-Tapes-Summer-Season-Album-2.jfif',
                plays: 1912710,
                artist: artistRefs[0],
                artistName: '$uicideboy$',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/%24B-ABOUT-Artist-1.jfif',
                artistMonthlyListeners: 11216508,
                album: albumRefs[1],
                albumName: 'YIN YANG TAPES: Summer Season (1989-1990)'
            },
            {
                title: "5 'N the Mornin'",
                length: "4:26",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+5+'N+the+Mornin'.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/Yin-Yang-Tapes-Summer-Season-Album-2.jfif',
                plays: 9983499,
                artist: artistRefs[0],
                artistName: '$uicideboy$',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/%24B-ABOUT-Artist-1.jfif',
                artistMonthlyListeners: 11216508,
                album: albumRefs[1],
                albumName: 'YIN YANG TAPES: Summer Season (1989-1990)'
            },
            {
                title: "Starry 9",
                length: "2:39",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+Starry+9.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/Yin-Yang-Tapes-Summer-Season-Album-2.jfif',
                plays: 6216354,
                artist: artistRefs[0],
                artistName: '$uicideboy$',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/%24B-ABOUT-Artist-1.jfif',
                artistMonthlyListeners: 11216508,
                album: albumRefs[1],
                albumName: 'YIN YANG TAPES: Summer Season (1989-1990)'
            },
            {
                title: "Bloody 98 (Feat. Ghostmane)",
                length: "4:37",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+Bloody+98+(Feat.+Ghostemane).mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/Yin-Yang-Tapes-Summer-Season-Album-2.jfif',
                plays: 20227858,
                artist: artistRefs[0],
                artistName: '$uicideboy$',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/%24B-ABOUT-Artist-1.jfif',
                artistMonthlyListeners: 11216508,
                album: albumRefs[1],
                albumName: 'YIN YANG TAPES: Summer Season (1989-1990)'
            },
            // Graduation
            {
                title: "Good Morning",
                length: "3:15",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+Good+Morning.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/Graduation-Album-3.jfif',
                plays: 272276775,
                artist: artistRefs[1],
                artistName: 'Kanye West',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/Kanye-West-ABOUT-Artist-2.jfif',
                artistMonthlyListeners: 64191521,
                album: albumRefs[2],
                albumName: 'Graduation'
            },
            {
                title: "Champion",
                length: "2:47",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+Champion.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/Graduation-Album-3.jfif',
                plays: 184949937,
                artist: artistRefs[1],
                artistName: 'Kanye West',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/Kanye-West-ABOUT-Artist-2.jfif',
                artistMonthlyListeners: 64191521,
                album: albumRefs[2],
                albumName: 'Graduation'
            },
            {
                title: "Stronger",
                length: "5:11",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+Stronger.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/Graduation-Album-3.jfif',
                plays: 1302723304,
                artist: artistRefs[1],
                artistName: 'Kanye West',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/Kanye-West-ABOUT-Artist-2.jfif',
                artistMonthlyListeners: 64191521,
                album: albumRefs[2],
                albumName: 'Graduation'
            },
            {
                title: "I Wonder",
                length: "4:03",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+I+Wonder.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/Graduation-Album-3.jfif',
                plays: 575633353,
                artist: artistRefs[1],
                artistName: 'Kanye West',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/Kanye-West-ABOUT-Artist-2.jfif',
                artistMonthlyListeners: 64191521,
                album: albumRefs[2],
                albumName: 'Graduation'
            },
            {
                title: "Good Life",
                length: "3:27",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+Good+Life.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/Graduation-Album-3.jfif',
                plays: 383921280,
                artist: artistRefs[1],
                artistName: 'Kanye West',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/Kanye-West-ABOUT-Artist-2.jfif',
                artistMonthlyListeners: 64191521,
                album: albumRefs[2],
                albumName: 'Graduation'
            },
            {
                title: "Can't Tell Me Nothing",
                length: "4:31",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+Can't+Tell+Me+Nothing.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/Graduation-Album-3.jfif',
                plays: 490821294,
                artist: artistRefs[1],
                artistName: 'Kanye West',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/Kanye-West-ABOUT-Artist-2.jfif',
                artistMonthlyListeners: 64191521,
                album: albumRefs[2],
                albumName: 'Graduation'
            },
            {
                title: "Barry Bonds",
                length: "3:24",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+Barry+Bonds.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/Graduation-Album-3.jfif',
                plays: 56760640,
                artist: artistRefs[1],
                artistName: 'Kanye West',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/Kanye-West-ABOUT-Artist-2.jfif',
                artistMonthlyListeners: 64191521,
                album: albumRefs[2],
                albumName: 'Graduation'
            },
            {
                title: "Drunk and Hot Girls",
                length: "5:13",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+Drunk+and+Hot+Girls.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/Graduation-Album-3.jfif',
                plays: 50008455,
                artist: artistRefs[1],
                artistName: 'Kanye West',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/Kanye-West-ABOUT-Artist-2.jfif',
                artistMonthlyListeners: 64191521,
                album: albumRefs[2],
                albumName: 'Graduation'
            },
            {
                title: "Flashing Lights",
                length: "3:57",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+Flashing+Lights.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/Graduation-Album-3.jfif',
                plays: 875401287,
                artist: artistRefs[1],
                artistName: 'Kanye West',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/Kanye-West-ABOUT-Artist-2.jfif',
                artistMonthlyListeners: 64191521,
                album: albumRefs[2],
                albumName: 'Graduation'
            },
            {
                title: "Everything I Am",
                length: "3:47",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+Everything+I+Am.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/Graduation-Album-3.jfif',
                plays: 180152731,
                artist: artistRefs[1],
                artistName: 'Kanye West',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/Kanye-West-ABOUT-Artist-2.jfif',
                artistMonthlyListeners: 64191521,
                album: albumRefs[2],
                albumName: 'Graduation'
            },
            {
                title: "The Glory",
                length: "3:32",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+The+Glory.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/Graduation-Album-3.jfif',
                plays: 73851938,
                artist: artistRefs[1],
                artistName: 'Kanye West',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/Kanye-West-ABOUT-Artist-2.jfif',
                artistMonthlyListeners: 64191521,
                album: albumRefs[2],
                albumName: 'Graduation'
            },
            {
                title: "Homecoming",
                length: "3:23",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+Homecoming.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/Graduation-Album-3.jfif',
                plays: 552626848,
                artist: artistRefs[1],
                artistName: 'Kanye West',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/Kanye-West-ABOUT-Artist-2.jfif',
                artistMonthlyListeners: 64191521,
                album: albumRefs[2],
                albumName: 'Graduation'
            },
            {
                title: "Big Brother",
                length: "4:47",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+Big+Brother.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/Graduation-Album-3.jfif',
                plays: 58523882,
                artist: artistRefs[1],
                artistName: 'Kanye West',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/Kanye-West-ABOUT-Artist-2.jfif',
                artistMonthlyListeners: 64191521,
                album: albumRefs[2],
                albumName: 'Graduation'
            },
            {
                title: "Good Night",
                length: "3:05",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+Good+Night.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/Graduation-Album-3.jfif',
                plays: 26347080,
                artist: artistRefs[1],
                artistName: 'Kanye West',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/Kanye-West-ABOUT-Artist-2.jfif',
                artistMonthlyListeners: 64191521,
                album: albumRefs[2],
                albumName: 'Graduation'
            },
            // 808s & Heartbreak
            {
                title: "Say You Will",
                length: "6:17",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+Say+You+Will.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/808s-%26-Heartbreak-Album-4.jfif',
                plays: 42373107,
                artist: artistRefs[1],
                artistName: 'Kanye West',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/Kanye-West-ABOUT-Artist-2.jfif',
                artistMonthlyListeners: 64191521,
                album: albumRefs[3],
                albumName: '808s & Heartbreak'
            },
            {
                title: "Welcome To Heartbreak",
                length: "4:22",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+Welcome+To+Heartbreak.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/808s-%26-Heartbreak-Album-4.jfif',
                plays: 75304097,
                artist: artistRefs[1],
                artistName: 'Kanye West',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/Kanye-West-ABOUT-Artist-2.jfif',
                artistMonthlyListeners: 64191521,
                album: albumRefs[3],
                albumName: '808s & Heartbreak'
            },
            {
                title: "Heartless",
                length: "3:31",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+Heartless.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/808s-%26-Heartbreak-Album-4.jfif',
                plays: 1075586037,
                artist: artistRefs[1],
                artistName: 'Kanye West',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/Kanye-West-ABOUT-Artist-2.jfif',
                artistMonthlyListeners: 64191521,
                album: albumRefs[3],
                albumName: '808s & Heartbreak'
            },
            {
                title: "Amazing",
                length: "3:58",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+Amazing.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/808s-%26-Heartbreak-Album-4.jfif',
                plays: 151231670,
                artist: artistRefs[1],
                artistName: 'Kanye West',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/Kanye-West-ABOUT-Artist-2.jfif',
                artistMonthlyListeners: 64191521,
                album: albumRefs[3],
                albumName: '808s & Heartbreak'
            },
            {
                title: "Love Lockdown",
                length: "4:30",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+Love+Lockdown.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/808s-%26-Heartbreak-Album-4.jfif',
                plays: 189617906,
                artist: artistRefs[1],
                artistName: 'Kanye West',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/Kanye-West-ABOUT-Artist-2.jfif',
                artistMonthlyListeners: 64191521,
                album: albumRefs[3],
                albumName: '808s & Heartbreak'
            },
            {
                title: "Paranoid",
                length: "4:47",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+Paranoid.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/808s-%26-Heartbreak-Album-4.jfif',
                plays: 89871396,
                artist: artistRefs[1],
                artistName: 'Kanye West',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/Kanye-West-ABOUT-Artist-2.jfif',
                artistMonthlyListeners: 64191521,
                album: albumRefs[3],
                albumName: '808s & Heartbreak'
            },
            {
                title: "RoboCop",
                length: "4:34",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+RoboCop.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/808s-%26-Heartbreak-Album-4.jfif',
                plays: 39091814,
                artist: artistRefs[1],
                artistName: 'Kanye West',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/Kanye-West-ABOUT-Artist-2.jfif',
                artistMonthlyListeners: 64191521,
                album: albumRefs[3],
                albumName: '808s & Heartbreak'
            },
            {
                title: "Street Lights",
                length: "3:09",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+Street+Lights.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/808s-%26-Heartbreak-Album-4.jfif',
                plays: 69516857,
                artist: artistRefs[1],
                artistName: 'Kanye West',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/Kanye-West-ABOUT-Artist-2.jfif',
                artistMonthlyListeners: 64191521,
                album: albumRefs[3],
                albumName: '808s & Heartbreak'
            },
            {
                title: "Bad News",
                length: "3:58",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+Bad+News.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/808s-%26-Heartbreak-Album-4.jfif',
                plays: 34326302,
                artist: artistRefs[1],
                artistName: 'Kanye West',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/Kanye-West-ABOUT-Artist-2.jfif',
                artistMonthlyListeners: 64191521,
                album: albumRefs[3],
                albumName: '808s & Heartbreak'
            },
            {
                title: "See You In My Nightmares",
                length: "4:18",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+See+You+In+My+Nightmares.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/808s-%26-Heartbreak-Album-4.jfif',
                plays: 38991772,
                artist: artistRefs[1],
                artistName: 'Kanye West',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/Kanye-West-ABOUT-Artist-2.jfif',
                artistMonthlyListeners: 64191521,
                album: albumRefs[3],
                albumName: '808s & Heartbreak'
            },
            {
                title: "Coldest Winter",
                length: "2:44",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+Coldest+Winter.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/808s-%26-Heartbreak-Album-4.jfif',
                plays: 42550668,
                artist: artistRefs[1],
                artistName: 'Kanye West',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/Kanye-West-ABOUT-Artist-2.jfif',
                artistMonthlyListeners: 64191521,
                album: albumRefs[3],
                albumName: '808s & Heartbreak'
            },
            {
                title: "Pinocchio Story",
                length: "6:01",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+Pinocchio+Story.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/808s-%26-Heartbreak-Album-4.jfif',
                plays: 17627403,
                artist: artistRefs[1],
                artistName: 'Kanye West',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/Kanye-West-ABOUT-Artist-2.jfif',
                artistMonthlyListeners: 64191521,
                album: albumRefs[3],
                albumName: '808s & Heartbreak'
            },
            // Recovery
            {
                title: "Cold Wind Blows",
                length: "5:03",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+Cold+Wind+Blows.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/Recovery-Album-5.jfif',
                plays: 102638408,
                artist: artistRefs[2],
                artistName: 'Eminem',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/Eminem-ABOUT-Artist-3.jfif',
                artistMonthlyListeners: 72027242,
                album: albumRefs[4],
                albumName: 'Recovery'
            },
            {
                title: "Talkin' 2 Myself",
                length: "5:00",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+Talkin%E2%80%99+2+Myself.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/Recovery-Album-5.jfif',
                plays: 87048847,
                artist: artistRefs[2],
                artistName: 'Eminem',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/Eminem-ABOUT-Artist-3.jfif',
                artistMonthlyListeners: 72027242,
                album: albumRefs[4],
                albumName: 'Recovery'
            },
            {
                title: "On Fire",
                length: "3:33",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+On+Fire.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/Recovery-Album-5.jfif',
                plays: 54016464,
                artist: artistRefs[2],
                artistName: 'Eminem',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/Eminem-ABOUT-Artist-3.jfif',
                artistMonthlyListeners: 72027242,
                album: albumRefs[4],
                albumName: 'Recovery'
            },
            {
                title: "Won't Back Down",
                length: "4:25",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+Won't+Back+Down.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/Recovery-Album-5.jfif',
                plays: 102202067,
                artist: artistRefs[2],
                artistName: 'Eminem',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/Eminem-ABOUT-Artist-3.jfif',
                artistMonthlyListeners: 72027242,
                album: albumRefs[4],
                albumName: 'Recovery'
            },
            {
                title: "W.T.P",
                length: "3:58",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+W.T.P..mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/Recovery-Album-5.jfif',
                plays: 99806700,
                artist: artistRefs[2],
                artistName: 'Eminem',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/Eminem-ABOUT-Artist-3.jfif',
                artistMonthlyListeners: 72027242,
                album: albumRefs[4],
                albumName: 'Recovery'
            },
            {
                title: "Going Through Changes",
                length: "4:58",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+Going+Through+Changes.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/Recovery-Album-5.jfif',
                plays: 72584879,
                artist: artistRefs[2],
                artistName: 'Eminem',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/Eminem-ABOUT-Artist-3.jfif',
                artistMonthlyListeners: 72027242,
                album: albumRefs[4],
                albumName: 'Recovery'
            },
            {
                title: "Not Afraid",
                length: "4:08",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+Not+Afraid.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/Recovery-Album-5.jfif',
                plays: 936886632,
                artist: artistRefs[2],
                artistName: 'Eminem',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/Eminem-ABOUT-Artist-3.jfif',
                artistMonthlyListeners: 72027242,
                album: albumRefs[4],
                albumName: 'Recovery'
            },
            {
                title: "Seduction",
                length: "4:35",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+Seduction.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/Recovery-Album-5.jfif',
                plays: 54463079,
                artist: artistRefs[2],
                artistName: 'Eminem',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/Eminem-ABOUT-Artist-3.jfif',
                artistMonthlyListeners: 72027242,
                album: albumRefs[4],
                albumName: 'Recovery'
            },
            {
                title: "No Love",
                length: "4:59",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+No+Love.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/Recovery-Album-5.jfif',
                plays: 311027582,
                artist: artistRefs[2],
                artistName: 'Eminem',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/Eminem-ABOUT-Artist-3.jfif',
                artistMonthlyListeners: 72027242,
                album: albumRefs[4],
                albumName: 'Recovery'
            },
            {
                title: "Space Bound",
                length: "4:38",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+Space+Bound.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/Recovery-Album-5.jfif',
                plays: 293785698,
                artist: artistRefs[2],
                artistName: 'Eminem',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/Eminem-ABOUT-Artist-3.jfif',
                artistMonthlyListeners: 72027242,
                album: albumRefs[4],
                albumName: 'Recovery'
            },
            {
                title: "Cinderella Man",
                length: "4:39",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+Cinderella+Man.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/Recovery-Album-5.jfif',
                plays: 297045840,
                artist: artistRefs[2],
                artistName: 'Eminem',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/Eminem-ABOUT-Artist-3.jfif',
                artistMonthlyListeners: 72027242,
                album: albumRefs[4],
                albumName: 'Recovery'
            },
            {
                title: "25 To Life",
                length: "4:01",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+25+To+Life.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/Recovery-Album-5.jfif',
                plays: 143833512,
                artist: artistRefs[2],
                artistName: 'Eminem',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/Eminem-ABOUT-Artist-3.jfif',
                artistMonthlyListeners: 72027242,
                album: albumRefs[4],
                albumName: 'Recovery'
            },
            {
                title: "So Bad",
                length: "5:25",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+So+Bad.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/Recovery-Album-5.jfif',
                plays: 76770691,
                artist: artistRefs[2],
                artistName: 'Eminem',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/Eminem-ABOUT-Artist-3.jfif',
                artistMonthlyListeners: 72027242,
                album: albumRefs[4],
                albumName: 'Recovery'
            },
            {
                title: "Almost Famous",
                length: "4:52",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+Almost+Famous.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/Recovery-Album-5.jfif',
                plays: 50811026,
                artist: artistRefs[2],
                artistName: 'Eminem',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/Eminem-ABOUT-Artist-3.jfif',
                artistMonthlyListeners: 72027242,
                album: albumRefs[4],
                albumName: 'Recovery'
            },
            {
                title: "Love The Way You Lie",
                length: "4:23",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+Love+The+Way+You+Lie.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/Recovery-Album-5.jfif',
                plays: 1362035134,
                artist: artistRefs[2],
                artistName: 'Eminem',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/Eminem-ABOUT-Artist-3.jfif',
                artistMonthlyListeners: 72027242,
                album: albumRefs[4],
                albumName: 'Recovery'
            },
            {
                title: "You're Never Over",
                length: "5:05",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+You%E2%80%99re+Never+Over.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/Recovery-Album-5.jfif',
                plays: 47526797,
                artist: artistRefs[2],
                artistName: 'Eminem',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/Eminem-ABOUT-Artist-3.jfif',
                artistMonthlyListeners: 72027242,
                album: albumRefs[4],
                albumName: 'Recovery'
            },
            {
                title: "Untitled",
                length: "3:14",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+Untitled.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/Recovery-Album-5.jfif',
                plays: 48294022,
                artist: artistRefs[2],
                artistName: 'Eminem',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/Eminem-ABOUT-Artist-3.jfif',
                artistMonthlyListeners: 72027242,
                album: albumRefs[4],
                albumName: 'Recovery'
            },
            // The Marshall Mathers LP2
            {
                title: "Bad Guy",
                length: "7:14",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+Bad+Guy.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/The-Marshall-Mathers-LP2-Album-6.jfif',
                plays: 111307418,
                artist: artistRefs[2],
                artistName: 'Eminem',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/Eminem-ABOUT-Artist-3.jfif',
                artistMonthlyListeners: 72027242,
                album: albumRefs[5],
                albumName: 'The Marshall Mathers LP2'
            },
            {
                title: "Parking Lot - Skit",
                length: "0:55",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+Parking+Lot+-+Skit.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/The-Marshall-Mathers-LP2-Album-6.jfif',
                plays: 27942209,
                artist: artistRefs[2],
                artistName: 'Eminem',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/Eminem-ABOUT-Artist-3.jfif',
                artistMonthlyListeners: 72027242,
                album: albumRefs[5],
                albumName: 'The Marshall Mathers LP2'
            },
            {
                title: "Rhyme Or Reason",
                length: "5:01",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+Rhyme+Or+Reason.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/The-Marshall-Mathers-LP2-Album-6.jfif',
                plays: 61537298,
                artist: artistRefs[2],
                artistName: 'Eminem',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/Eminem-ABOUT-Artist-3.jfif',
                artistMonthlyListeners: 72027242,
                album: albumRefs[5],
                albumName: 'The Marshall Mathers LP2'
            },
            {
                title: "So Much Better",
                length: "4:21",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+So+Much+Better.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/The-Marshall-Mathers-LP2-Album-6.jfif',
                plays: 56155413,
                artist: artistRefs[2],
                artistName: 'Eminem',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/Eminem-ABOUT-Artist-3.jfif',
                artistMonthlyListeners: 72027242,
                album: albumRefs[5],
                albumName: 'The Marshall Mathers LP2'
            },
            {
                title: "Survival",
                length: "4:32",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+Survival.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/The-Marshall-Mathers-LP2-Album-6.jfif',
                plays: 248959425,
                artist: artistRefs[2],
                artistName: 'Eminem',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/Eminem-ABOUT-Artist-3.jfif',
                artistMonthlyListeners: 72027242,
                album: albumRefs[5],
                albumName: 'The Marshall Mathers LP2'
            },
            {
                title: "Legacy",
                length: "4:56",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+Legacy.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/The-Marshall-Mathers-LP2-Album-6.jfif',
                plays: 147875131,
                artist: artistRefs[2],
                artistName: 'Eminem',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/Eminem-ABOUT-Artist-3.jfif',
                artistMonthlyListeners: 72027242,
                album: albumRefs[5],
                albumName: 'The Marshall Mathers LP2'
            },
            {
                title: "Asshole",
                length: "4:48",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+Asshole.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/The-Marshall-Mathers-LP2-Album-6.jfif',
                plays: 56948495,
                artist: artistRefs[2],
                artistName: 'Eminem',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/Eminem-ABOUT-Artist-3.jfif',
                artistMonthlyListeners: 72027242,
                album: albumRefs[5],
                albumName: 'The Marshall Mathers LP2'
            },
            {
                title: "Berzerk",
                length: "3:58",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+Berzerk.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/The-Marshall-Mathers-LP2-Album-6.jfif',
                plays: 294646323,
                artist: artistRefs[2],
                artistName: 'Eminem',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/Eminem-ABOUT-Artist-3.jfif',
                artistMonthlyListeners: 72027242,
                album: albumRefs[5],
                albumName: 'The Marshall Mathers LP2'
            },
            {
                title: "Rap God",
                length: "6:03",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+Rap+God.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/The-Marshall-Mathers-LP2-Album-6.jfif',
                plays: 1024452496,
                artist: artistRefs[2],
                artistName: 'Eminem',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/Eminem-ABOUT-Artist-3.jfif',
                artistMonthlyListeners: 72027242,
                album: albumRefs[5],
                albumName: 'The Marshall Mathers LP2'
            },
            {
                title: "Brainless",
                length: "4:46",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+Brainless.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/The-Marshall-Mathers-LP2-Album-6.jfif',
                plays: 52372632,
                artist: artistRefs[2],
                artistName: 'Eminem',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/Eminem-ABOUT-Artist-3.jfif',
                artistMonthlyListeners: 72027242,
                album: albumRefs[5],
                albumName: 'The Marshall Mathers LP2'
            },
            {
                title: "Stronger Than I Was",
                length: "5:36",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+Stronger+Than+I+Was.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/The-Marshall-Mathers-LP2-Album-6.jfif',
                plays: 62403834,
                artist: artistRefs[2],
                artistName: 'Eminem',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/Eminem-ABOUT-Artist-3.jfif',
                artistMonthlyListeners: 72027242,
                album: albumRefs[5],
                albumName: 'The Marshall Mathers LP2'
            },
            {
                title: "The Monster",
                length: "4:10",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+The+Monster.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/The-Marshall-Mathers-LP2-Album-6.jfif',
                plays: 944989922,
                artist: artistRefs[2],
                artistName: 'Eminem',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/Eminem-ABOUT-Artist-3.jfif',
                artistMonthlyListeners: 72027242,
                album: albumRefs[5],
                albumName: 'The Marshall Mathers LP2'
            },
            {
                title: "So Far...",
                length: "5:17",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+So+Far....mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/The-Marshall-Mathers-LP2-Album-6.jfif',
                plays: 51964465,
                artist: artistRefs[2],
                artistName: 'Eminem',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/Eminem-ABOUT-Artist-3.jfif',
                artistMonthlyListeners: 72027242,
                album: albumRefs[5],
                albumName: 'The Marshall Mathers LP2'
            },
            {
                title: "Love Game",
                length: "4:56",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+Love+Game.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/The-Marshall-Mathers-LP2-Album-6.jfif',
                plays: 68940145,
                artist: artistRefs[2],
                artistName: 'Eminem',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/Eminem-ABOUT-Artist-3.jfif',
                artistMonthlyListeners: 72027242,
                album: albumRefs[5],
                albumName: 'The Marshall Mathers LP2'
            },
            {
                title: "Headlights",
                length: "5:43",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+Headlights.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/The-Marshall-Mathers-LP2-Album-6.jfif',
                plays: 149138309,
                artist: artistRefs[2],
                artistName: 'Eminem',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/Eminem-ABOUT-Artist-3.jfif',
                artistMonthlyListeners: 72027242,
                album: albumRefs[5],
                albumName: 'The Marshall Mathers LP2'
            },
            {
                title: "Evil Twin - Skit",
                length: "7:33",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+Evil+Twin+-+Skit.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/The-Marshall-Mathers-LP2-Album-6.jfif',
                plays: 9110651,
                artist: artistRefs[2],
                artistName: 'Eminem',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/Eminem-ABOUT-Artist-3.jfif',
                artistMonthlyListeners: 72027242,
                album: albumRefs[5],
                albumName: 'The Marshall Mathers LP2'
            },
            // Fear
            {
                title: "Fear",
                length: "2:11",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+Fear.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/Fear-Album-7.jfif',
                plays: 19172205,
                artist: artistRefs[3],
                artistName: 'Hensonn',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/Hensonn-ABOUT-Artist-4.jfif',
                artistMonthlyListeners: 4153680,
                album: albumRefs[6],
                albumName: 'Fear'
            },
            // Sahara
            {
                title: "Sahara",
                length: "2:51",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+Sahara.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/Sahara-Album-8.jfif',
                plays: 246129400,
                artist: artistRefs[3],
                artistName: 'Hensonn',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/Hensonn-ABOUT-Artist-4.jfif',
                artistMonthlyListeners: 4153680,
                album: albumRefs[7],
                albumName: 'Sahara'
            },
            // KILLKA
            {
                title: "KILLKA",
                length: "2:22",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+KILLKA.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/KILLKA-Album-9.jfif',
                plays: 47259289,
                artist: artistRefs[4],
                artistName: 'fkbambam',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/fkbambam-ABOUT-Artist-5.jfif',
                artistMonthlyListeners: 851181,
                album: albumRefs[8],
                albumName: 'KILLKA'
            },
            // VACATION
            {
                title: "VACATION",
                length: "1:56",
                audio: "https://sebass-novawave.s3.us-east-2.amazonaws.com/audio/spotifydown.com+-+VACATION.mp3", // AWS
                image: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/album-images/VACATION-Album-10.jfif',
                plays: 15677488,
                artist: artistRefs[4],
                artistName: 'fkbambam',
                artistAboutImage: 'https://sebass-novawave.s3.us-east-2.amazonaws.com/artist-about/fkbambam-ABOUT-Artist-5.jfif',
                artistMonthlyListeners: 851181,
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
        //? SEED PLAYLISTS
        const playlists = [
            {
                owner: userRefs[0],
                likes: 0,
                title: "The Classics",
                desc: "i love these",
                tracks: [
                    {
                        track: trackRefs[0],
                        addedAt: new Date()
                    },
                    {
                        track: trackRefs[10],
                        addedAt: new Date()
                    },
                    {
                        track: trackRefs[20],
                        addedAt: new Date()
                    },
                    {
                        track: trackRefs[30],
                        addedAt: new Date()
                    },
                ],
                length: '14:26',
                isPrivate: false,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                owner: userRefs[1],
                likes: 0,
                title: "Bangers",
                desc: "",
                tracks: [
                    {
                        track: trackRefs[40],
                        addedAt: new Date()
                    },
                    {
                        track: trackRefs[50],
                        addedAt: new Date()
                    },
                    {
                        track: trackRefs[60],
                        addedAt: new Date()
                    },
                    {
                        track: trackRefs[5],
                        addedAt: new Date()
                    },
                ],
                length: '20:04',
                isPrivate: false,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                owner: userRefs[2],
                likes: 0,
                title: "Best Songs",
                desc: "these are the best",
                tracks: [
                    {
                        track: trackRefs[11],
                        addedAt: new Date()
                    },
                    {
                        track: trackRefs[22],
                        addedAt: new Date()
                    },
                    {
                        track: trackRefs[33],
                        addedAt: new Date()
                    },
                    {
                        track: trackRefs[44],
                        addedAt: new Date()
                    },
                ],
                length: '16:53',
                isPrivate: false,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ];
        await db.collection("playlists").insertMany(playlists);
        // ------------------------------------------------------------------------------------------------------------------------------------------------------------ //
        //! ADD 'Playlist' REFS TO 'User'
        /* playlistIds ---> */ const playlistRefs = (await db.collection("playlists").find({}).project({ _id: 1 }).toArray()).map(track => track._id);
        // update SebassStovall --> add Bar's playlist to collection
        await db.collection('users').updateOne({ _id: userRefs[0] }, { $addToSet: { playlists: [playlistRefs[5]] } });
        // update Foo --> add SebassStovall playlist to collection
        await db.collection('users').updateOne({ _id: userRefs[1] }, { $addToSet: { playlists: [playlistRefs[3]] } });
        // update Bar --> add Foo playlist to collection
        await db.collection('users').updateOne({ _id: userRefs[2] }, { $addToSet: { playlists: [playlistRefs[4]] } });
        //! ADD 'Album' REFS TO 'User'
        // update SebassStovall
        await db.collection('users').updateOne({ _id: userRefs[0] }, { $set: { albums: [albumRefs[0], albumRefs[1]] } });
        // update Foo
        await db.collection('users').updateOne({ _id: userRefs[1] }, { $set: { albums: [albumRefs[2], albumRefs[3]] } });
        // update Bar
        await db.collection('users').updateOne({ _id: userRefs[2] }, { $set: { albums: [albumRefs[4], albumRefs[5]] } });
        //! ADD 'Artist' REFS TO 'USER'
        // update SebassStovall
        await db.collection('users').updateOne({ _id: userRefs[0] }, { $set: { artists: [artistRefs[0], artistRefs[3]] } });
        // update Foo
        await db.collection('users').updateOne({ _id: userRefs[1] }, { $set: { artists: [artistRefs[1], artistRefs[4]] } });
        // update Bar
        await db.collection('users').updateOne({ _id: userRefs[2] }, { $set: { artists: [artistRefs[2]] } });
        console.log('Database seeded successfully.');
        await (0, connect_1.disconnectFromMongoDB)();
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
