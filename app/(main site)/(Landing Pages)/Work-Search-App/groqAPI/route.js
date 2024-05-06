import { json } from 'body-parser';
import { NextResponse } from 'next/server'
import * as responseUtils from '../responseUtils'



const Groq = require("groq-sdk");
const groq = new Groq({
    apiKey: process.env.GROQAPI
});
async function main() {
    const chatCompletion = await getGroqChatCompletion();
    // Print the completion returned by the LLM.
    let goodResult = chatCompletion.choices[0]?.message?.content
    console.log(chatCompletion.choices[0]?.message?.content || "");
    const regex = /\[(.*?)\]/g;

    const matches = goodResult.match(regex);
    console.log(matches)
    let test = await JSON.parse(matches[0])
    console.log(test)
    return test
}
async function getGroqChatCompletion() {
    return groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: `This is is your instructions. I need you to take my RESUMEDATA and use it to select the best responses from the JSONDATA. I also want you to reward the response if possible using best practices for what an employer would want the response to look like. I want your answer to be a JSON response with one text response per question. If the JSONDATA has options, then give the best option in your response, give the option verbatim.   Your answer should mimick this format.

                [{"question": "{question given in JSONDATA}", "response": "{your response or the best option}"}]  
                
                RESUMEDATA: Malcolm Vernon
                
                Software Developer
                
                (970) 703-3947 | malcolmxvernon@hotmail.com | Largo, FL | linkedin.com/in/malcolm-vernon | github.com/apophis51
                
                | Portfolio https://malcmind.com
                
                Professional Summary
                
                Results-driven JavaScript developer seeking positions in full-stack software development. Experienced launching and
                
                developing apps on diverse platforms to include docker, AWS, and Google Cloud.
                
                TECHNICAL SKILLS
                
                Languages/Scripting: JavaScript, Python, Solidity, Bash, SQL
                
                Front-end Frameworks/Libraries: React, Redux, TailwindCSS, Three.js, Framer Motion, MaterialUI, DaisyUi,
                
                Shopify .Liquid
                
                Back-end/Frameworks: Node, Next.js, Flask, Express.js, Astro.js
                
                OS and Source Control: Windows, Linux, Git, GitHub
                
                Deployment: AWS (EC2), Google (compute) Railway, Vercel, Netlify, Docker
                
                Markup: HTML5, CSS, Markdown
                
                Databases: PostgreSql
                
                Other Libraries: Axios, Selenium, Sequelize, Prisma
                
                Dabbled with: Mokoto, React Native, ScikitLearn, Pandas, FireBase, MongoDb
                
                Architectural Approaches: JamStack, SPA, MPA, MVC
                
                Technical Projects
                
                FullStack Developer | MalcMind | Largo, FL
                
                June 2023 - April 2024
                
                A digital Web App focused on Programming, CyberSecurity, AI, and BlockChain Gaming
                
                ●
                
                Successfully developed and launched MalcMind Work Search App on the Chrome Extension store
                
                ●
                
                Successfully deployed and completed 127 Project Branches on Github with an Agile Methodology
                
                ●
                
                Designed and Implemented the Apps UX/UI design using - React, Next.js, MaterialUI, DaisyUI and TailwindCss
                
                ●
                
                Implemented the Apps content Management system for Blogs using Strapi CMS, and ReactMarkdown
                
                ●
                
                Responsible for site QA and testing using PlayWright
                
                ●
                
                Designed and Developed the Sites Crypto-Prediction Web App using Machine Learning and Brain.js
                
                ●
                
                Designed, Developed, and Curated content for the Sites Interactive CyberSecurity Tutorials with an online Linux
                
                Terminal using - Xterm, Docker, Pty, Express, and WebSockets
                
                ●
                
                Designed and Implemented the Apps Database Schema and Interface Using Prisma
                
                ●
                
                Responsible for creating the Apps Authentication access points using Next-Auth
                
                ●
                
                Implemented the Web Apps Payment system with the Stripe API
                
                ●
                
                Designed and Developed the “Let's Play Guess The Number” Ethereum Blockchain Game using HardHat, Solidity
                
                and React - deployed to the Optimism Ethereum Blockchain
                
                ●
                
                Responsible for CI/CD and Agile management using GitHUB
                
                ●
                
                Responsible for the Apps Cloud Infrastructure and deployment using a combination of - Cloudinary, Railway,
                
                Docker Containers, AWS, Vercel, NGINX, Google Compute Engine, and Cloudflare
                
                Software Developer | FlixQuest | Largo, FL
                
                May 2023 - May 2023
                
                A digital movie store (similar to IMDB) with modernized features for enhanced movie searching. Search bar enables you
                
                to search movies by natural descriptions, as well as by movie title. Techstack Used: Node.js, React, Redux, Tailwind,
                
                DaisyUI, GPT/Google/TMDB - APIs
                
                ●
                
                Responsible for the design and implementation of the Search Bar and AI Logic
                
                ●
                
                Executed the Design and implementation of the stores API connections to GPT, Google, and TMDB for quick data
                
                retrieval when movies are requested
                
                ●
                
                Responsible for the Design and Implementation of the sites Redux state design, and Movie component views
                
                ●
                
                Responsible for Deploying and maintaining the sites online status
                
                ●
                
                Corrected CSS design flaws that improved the sites usability and aesthetics
                
                Work Experience
                
                Javascript Tutor | Preply | Largo, FL
                
                July 2023 - August 2023●
                
                Mentored a 9 year old student twice a week on Javascript Fundamentals - Variables, Functions, Logic Control
                
                SEO - Web Developer | RockyGreenKing (Shopify)| Largo, FL
                
                July 2020 - July 2023
                
                ●
                
                Self-Made Content Strategy, Link Building, and Content Writing resulting in 300 organic users per day and generated
                
                9000 organic monthly hits. (Peaked at $5000 in monthly sales)
                
                ●
                
                Spearheaded Inventory ordering, tracking, and acquisition through various Chinese manufacturers reducing product
                
                backlog by 3 months
                
                ●
                
                Helped customers resolve problems with orders and general inquiries - Resulting in < 1% product Return Rate
                
                ●
                
                Improved Customer UX experience through JavaScript and CSS improvements in Shopify .liquid Pages resulting in
                
                100% increased time on page
                
                ●
                
                Developed various workflow and SEO Automations in Python and Flask increasing work productivity by 200%
                
                SEO Specialist | iVisa.Com | Largo, FL
                
                July 2020 - Aug 2022
                
                ●
                
                Coordinated and executed daily SEO Tasks with Head SEO, and product team
                
                ●
                
                Responsible for keyword analysis, finding, and writer content briefs - resulting in 500% more searches
                
                ●
                
                Manual SEO edits for optimized HTML Titles/H1s, BERT Featured Snippets, and People Also ASK SERP results for
                
                improved SEO content relevancy resulting in 10% increased traffic to targeted pages
                
                ●
                
                Generated SOPs and reporting for Quarterly results for tracking
                
                ●
                
                Liaised with content writers spanning 13 languages for our non-English content writing Coordinated the strategy and
                
                execution of 1000s of content pieces resulting in 500% traffic growth in a 2-year period.
                
                EDUCATION
                
                Fullstack Academy Web Development Bootcamp
                
                Jan 2023 - May 2023
                
                ●
                
                An immersive 17-week career accelerator for intermediate coders
                
                ●
                
                Technologies and Stacks Used - JavaScript, HTML, CSS, Node, React, Redux, Express, PostgreSQL, Sequelize, Axios
                
                Google Cybersecurity
                
                Jul 2023 - Jan 2024
                
                Professional Certificate
                
                Those who earn the Google Cybersecurity Certificate have completed
                
                eight courses, developed by Google, that include hands-on, practice based assessments and are designed to prepare
                
                them for entry-level
                
                roles in cybersecurity. They are competent in beginner-level Python,
                
                Linux, SQL, Security Information and Event Management (SIEM) tools,
                
                and Intrusion Detection Systems (IDS). They know how to identify
                
                common cybersecurity risks, threats, and vulnerabilities, as well as the
                
                techniques to mitigate.
                
                Verify this certificate at:
                
                https://coursera.org/verify/profession
                
                al-cert/NTN6UQWQX8F5
                
                University Colorado Denver - Partial
                
                Feb 2015 - Feb 2017
                
                Bachelors in Electrical Engineering
                
                ●
                
                Completed 90 credits
                
                ●
                
                Relevant coursework: C++, Assembly
                
                Community College of the Air Force
                
                Feb 2008 - Feb 2012
                
                Associates in Electronic System Technology
                
                MILITARY SERVICE
                
                United States Air Force
                
                F.E. Warren AFB, Cheyenne, WY
                
                90th Missile Wing/Maintenance Operations Squadron
                
                Dec 2010  July 2014
                
                Senior Weapons Systems Controller (MMOC)
                
                Top Secret Clearance●
                
                Served focal point for discrepancy reporting of a 9.6 thousand Mile Missile Field complex.
                
                ●
                
                Supervised Airmen in their maintenance coordination which could exceed 100 maintenance
                
                ●
                
                calls an hour.
                
                ● Awarded Air Force Achievement medal after identifying systems faults that befell a
                
                ●
                
                catastrophic loss of communication to 50 launch facilities, faults which were subsequently
                
                ●
                
                corrected.
                
                ●
                
                Ensured accurate reporting of Missile Field alert status to senior leadership.
                
                ●
                
                Reported/prioritized 252 partial mission capable and non-launch capable conditions up
                
                ●
                
                channeled to Global Strike command.
                
                ●
                
                Directed 184 Missile guidance set swaps, wing awarded USSTRATCOMS Omaha Trophy,
                
                “Best ICBM Wing”.
                
                United States Air Force
                
                F.E. Warren AFB, Cheyenne, WY
                
                90th Missile Wing/Maintenance Operations Squadron
                
                Nov 2007 – Dec 2010
                
                Electro-Mechanical Maintenance Technician (EMT)
                
                Top Secret Clearance
                
                ● Awarded Air Force Achievement Medal in aiding the rapid removal and replacement of failed
                
                ● Minuteman III Intercontinental Ballistic Missile downstage due to a flight control failure.
                
                ●
                
                Executed 72 dispatches paramount in the completion of 294 work orders and maintained
                
                ●
                
                99.6% alert rate.
                
                ●
                
                Performed 20 mission-critical startups quickly returning sorties to alert status.
                
                ●
                
                Prepped/reconfigured four launch facilities for $2.4 million hardness surveillance EMP
                
                ● program.
                
                ●
                
                Personally loaded and verified codes for 17 intercontinental ballistic missile launch facilities.
                
                ● Troubleshoot 8 faulty guidance and control cooling systems averting damage to $1.7 million
                
                ●
                
                dollar missile guidance sets.
                
                -------------------------------------------------------------------------------------------------------------------------------------
                
                Country: United States of America
                
                First Name: Malcolm
                
                Last Name: Vernon
                
                Address Line 1: 1685 coral way apt b
                
                City: Largo
                
                State: Florida
                
                Postal Code: 33771
                
                Email address:malcolmxvernon@hotmail.com
                
                Phone Device Type: mobile
                
                Country Phone Code: 1
                
                Phone number:  970703947
                
                How did you hear about us?: pick linkdin or indeed if available
                
                Do you now, or will you in the future, require sponsorship to work in the country you are applying to?: no
                
                What is your official notice period?: 2 weeks
                
                What is your current or most recent salary?: 19 an hour
                
                What is your desired salary?: 70k or what ever the equivalent is for that hourly. im open to what ever
                
                Do you have any restrictions that would apply to your employment at FIS, such as a Non-Compete or No Solicitation agreement?: always say no to non-competes
                
                
                JSONDATA: [ { "question": "Country*", "options": [ "Please Select", "Afghanistan", "Ã…land Islands", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bonaire, Sint Eustatius, and Saba", "Bosnia and Herzegovina", "Botswana", "Brazil", "British Indian Ocean Territory", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, Democratic Republic of the", "Cook Islands", "Costa Rica", "CÃte dIvoire", "Croatia", "Cuba", "CuraÃ§ao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea", "GuineaBissau", "Guyana", "Haiti", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macao", "Macedonia, the Former Yugoslav Republic of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria",
                 "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn Islands", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Barthelemy", "Saint Helena, Ascension and Tristan da Cunha", "Saint Kitts and Nevis", "Saint Lucia", "Saint Martin", "Saint Pierre and Miquelon", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "SaudiArabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Sint Maarten", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Svalbard and Jan Mayen", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uzbekistan", "U. S. Virgin Islands", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States Minor Outlying Islands", "United States of America", "Uruguay", "Vanuatu", "Venezuela", "Vietnam", "Wallis and Futuna", "Western Sahara", "Yemen", "Zambia", "Zimbabwe" ] }, { "question": "First Name*" }, { "question": "Last Name*" },
                  { "question": "Address Line 1*" }, { "question": "City*" }, { "question": "State*", "options": [ "Please Select", "Alabama", "Alaska", "American Samoa", "Arizona", "Arkansas", "Armed Forces Americas", "Armed Forces Europe", "Armed Forces Pacific", "California", "Colorado", "Connecticut", "Delaware", "District of Columbia", "Florida", "Georgia", "Guam", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Northern Mariana Islands", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Puerto Rico", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "United States Minor Outlying Islands", "Utah", "Vermont", "Virgin Islands, U.S.", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming" ] }, { "question": "Postal Code*" }, { "question": "Email address*" }, { "question": "Phone Device Type*", "options": [ "Please Select", "Fax", "Landline", "Mobile" ] }, { "question": "Country Phone Code*", "options": [ "Please Select", "Afghanistan (+93)", "Ã…land Islands (+358)", "Albania (+355)", "Algeria (+213)", "American Samoa (+1)", "Andorra (+376)", "Angola (+244)", "Anguilla (+1)", "Antigua and Barbuda (+1)", "Argentina (+54)", "Armenia (+374)", "Aruba (+297)", "Australia (+61)", "Austria (+43)", "Azerbaijan (+994)", "Bahamas (+1)", "Bahrain (+973)", "Bangladesh (+880)", "Barbados (+1)", "Belarus (+375)", "Belgium (+32)", "Belize (+501)", "Benin (+229)", "Bermuda (+1)", "Bhutan (+975)", "Bolivia (+591)", "Bonaire, Sint Eustatius, and Saba (+599)", "Bosnia and Herzegovina (+387)", "Botswana (+267)", "Brazil (+55)", "British Indian Ocean Territory (+246)", "British Virgin Islands (+1)", "Brunei (+673)", "Bulgaria (+359)", "Burkina Faso (+226)", "Burundi (+257)", "Cabo Verde (+238)", "Cambodia (+855)", "Cameroon (+237)", "Canada (+1)", "Cayman Islands (+1)", "Central African Republic (+236)", "Chad (+235)", "Chile (+56)", "China (+86)", "Christmas Island (+61)", "Cocos (Keeling) Islands (+61)", "Colombia (+57)",
                 "Comoros (+269)", "Congo (+242)", "Congo, Democratic Republic of the (+243)", "Cook Islands (+682)", "Costa Rica (+506)", "Croatia (+385)", "Cuba (+53)", "CuraÃ§ao (+599)", "Cyprus (+357)", "Czech Republic (+420)", "CÃte dâ€™Ivoire (+225)", "Denmark (+45)", "Djibouti (+253)", "Dominica (+1)", "Dominican Republic (+1)", "Ecuador (+593)", "Egypt (+20)", "El Salvador (+503)", "Equatorial Guinea (+240)", "Eritrea (+291)", "Estonia (+372)", "Ethiopia (+251)", "Falkland Islands (+500)", "Faroe Islands (+298)", "Fiji (+679)", "Finland (+358)", "France (+33)", "French Guiana (+594)", "French Polynesia (+689)", "Gabon (+241)", "Gambia (+220)", "Georgia (+995)", "Germany (+49)", "Ghana (+233)", "Gibraltar (+350)", "Greece (+30)", "Greenland (+299)", "Grenada (+1)", "Guadeloupe (+590)", "Guam (+1)", "Guatemala (+502)", "Guernsey (+44)", "Guinea (+224)", "Guinea-Bissau (+245)", "Guyana (+592)", "Haiti (+509)", "Holy See (Vatican City State) (+39)", "Honduras (+504)", "Hong Kong (+852)", "Hungary (+36)", "Iceland (+354)", "India (+91)", "Indonesia (+62)", "Iran (+98)", "Iraq (+964)", "Ireland (+353)", "Isle of Man (+44)", "Israel (+972)", "Italy (+39)", "Jamaica (+1)", "Japan (+81)", "Jersey (+44)", "Jordan (+962)", "Kazakhstan (+7)", "Kenya (+254)", "Kiribati (+686)", "Korea, Democratic Peopleâ€™s Republic of (+850)", "Korea, Republic of (+82)", "Kosovo (+377)", "Kosovo (+381)", "Kosovo (+383)", "Kosovo (+386)", "Kuwait (+965)", "Kyrgyzstan (+996)", "Laos (+856)", "Latvia (+371)", "Lebanon (+961)", "Lesotho (+266)", "Liberia (+231)", "Libya (+218)", "Liechtenstein (+423)", "Lithuania (+370)", "Luxembourg (+352)", "Macao (+853)", "Macedonia, the Former Yugoslav Republic of (+389)", "Madagascar (+261)", "Malawi (+265)", "Malaysia (+60)", "Maldives (+960)", "Mali (+223)", "Malta (+356)", "Marshall Islands (+692)", "Martinique (+596)", "Mauritania (+222)", "Mauritius (+230)", "Mayotte (+262)",
                 "Mexico (+52)", "Micronesia, Federated States of (+691)", "Moldova (+373)", "Monaco (+377)", "Mongolia (+976)", "Montenegro (+382)", "Montserrat (+1)", "Morocco (+212)", "Mozambique (+258)", "Myanmar (+95)", "Namibia (+264)", "Nauru (+674)", "Nepal (+977)", "Netherlands (+31)", "New Caledonia (+687)", "New Zealand (+64)", "Nicaragua (+505)", "Niger (+227)", "Nigeria (+234)", "Niue (+683)", "Norfolk Island (+672)", "Northern Mariana Islands (+1)", "Norway (+47)", "Oman (+968)", "Pakistan (+92)", "Palau (+680)", "Palestine (+970)", "Panama (+507)", "Papua New Guinea (+675)", "Paraguay (+595)", "Peru (+51)", "Philippines (+63)", "Pitcairn Islands (+64)", "Poland (+48)", "Portugal (+351)", "Puerto Rico (+1)", "Qatar (+974)", "Reunion (+262)", "Romania (+40)", "Russian Federation (+7)", "Rwanda (+250)", "Saint Barthelemy (+590)", "Saint Helena, Ascension and Tristan da Cunha (+247)", "Saint Helena, Ascension and Tristan da Cunha (+290)", "Saint Kitts and Nevis (+869)", "Saint Lucia (+1)", "Saint Martin (+590)", "Saint Pierre and Miquelon (+508)", "Saint Vincent and the Grenadines (+1)", "Samoa (+685)", "San Marino (+378)", "Sao Tome and Principe (+239)", "Saudi Arabia (+966)", "Senegal (+221)", "Serbia (+381)", "Seychelles (+248)", "Sierra Leone (+232)", "Singapore (+65)", "Sint Maarten (+1)", "Slovakia (+421)", "Slovenia (+386)", "Solomon Islands (+677)", "Somalia (+252)", "South Africa (+27)", "South Sudan (+211)", "Spain (+34)", "Sri Lanka (+94)", "Sudan (+249)", "Suriname (+597)", "Svalbard and Jan Mayen (+47)", "Swaziland (+268)", "Sweden (+46)", "Switzerland (+41)", "Syria (+963)", "Taiwan (+886)", "Tajikistan (+992)", "Tanzania (+255)", "Thailand (+66)", "Timor-Leste (+670)", "Togo (+228)", "Tokelau (+690)", "Tonga (+676)", "Trinidad and Tobago (+1)", "Tunisia (+216)", "Turkey (+90)", "Turkmenistan (+993)", "Turks and Caicos Islands (+1)", "Tuvalu (+688)", "U. S. Virgin Islands (+1)", "Uganda (+256)", "Ukraine (+380)", "United Arab Emirates (+971)", "United Kingdom (+44)", "United States Minor Outlying Islands (+1)", "United States of America (+1)", "Uruguay (+598)", "Uzbekistan (+998)", "Vanuatu (+678)", "Venezuela (+58)",
                  "Vietnam (+84)", "Wallis and Futuna (+681)", "Western Sahara (+212)", "Yemen (+967)", "Zambia (+260)", "Zimbabwe (+263)" ] }, { "question": "Phone number*" }, { "question": "How did you hear about us?*", "options": [ "Please Select", "51job.com", "Absolvent Talent Days", "Absolvent.pl", "Built in Colorado", "Cadremploi.fr", "Careerbuilder", "Contacted by FIS Recruiter", "CV Library", "CW Jobs", "Dice", "Disability Solutions", "Doors of Clubs", "eFinancial Careers", "Employee Referral", "Facebook", "FIS Career Site", "Glassdoor", "HandShake", "Hire Heroes", "Hired.com", "HirePurpose", "Inclusively", "Indeed", "Infostud", "inhire.io", "Inside Careers", "Instagram", "Job Fair", "Joberty", "Jobs.Ch", "JobsDB", "Jobsite.co.uk", "JobStreet", "Lie Pin", "LinkedIn", "Milkround Online", "Monster", "Mynimo", "Naukri", "No Fluff Jobs", "Pracuj.pl", "Professional Association", "Seek", "Seekout",
                 "Shinejobs.com", "SimplyHired.com", "Stepstone", "Talent Network", "TargetJobs", "Timesjobs", "TRP", "Twitter", "University", "Walk-In Applied at Office Location", "WayUp", "Women In Payments", "Zhaopin", "ZipRecruiter", "ZoomInfo" ] }, { "question": "Are you now or have you ever been employed or contracted by an FIS company?*", "options": [ "Please Select", "Yes", "No" ] }, { "question": "Do you have any relatives that currently work for FIS?*", "options": [ "Please Select", "Yes", "No" ] }, { "question": "No" }, { "question": "Yes" }, { "question": "Do you now, or will you in the future, require sponsorship to work in the country you are applying to?*", "options": [ "Please Select", "No", "Yes" ] }, { "question": "What is your official notice period?*" }, { "question"
                : "What is your current or most recent salary?*" }, { "question": "What is your desired salary?*" }, { "question": "Do you have any restrictions that would apply to your employment at FIS, such as a Non-Compete or No Solicitation agreement?*", "options": [ "Please Select", "No", "Yes" ] }, { "question": "FIS requests the following information for the limited purposes of assuring compliance with applicable immigration, export and other laws. By providing this information to FIS you are expressly consenting FISâ€™ use of the information for that purpose. Please indicate if you are a national or permanent resident of any of the following countries: Cuba, Iran, North Korea, Syria, and the Crimea and so-called Luhansk Peopleâ€™s Republic and Donetsk Peopleâ€™s Republic Regions of Ukraine or Russia.*", "options": [ "Please Select", "Yes", "No" ] } ] `
            }
        ],
        model: "llama3-8b-8192",
        temperature: 0,
        max_tokens: 1024,
        top_p: 1,
        stop: null,
        stream: false
    });
}

export async function OPTIONS() {
    return NextResponse.json(
        {
            data: {
                information: 'You hit the OpTions Route. Most likely as a preFlight Request'
            }
        },
        responseUtils.allowCors)
}

export async function GET() {
    let result = await main()
    let stringifyResult = JSON.stringify(result)
    return NextResponse.json(
        {
            data: {
                information: result
            }
        },
        responseUtils.allowCors)
}
