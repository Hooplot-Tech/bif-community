import { useState, useEffect, useRef } from "react";

// ─── ICONS ───
const Icons = {
  Globe: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  Users: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Star: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
  Arrow: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>,
  Back: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>,
  Check: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>,
  Menu: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  Close: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Lock: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  Mail: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/></svg>,
  Heart: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  Book: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
  Award: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>,
  Sparkle: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"/></svg>,
  Calendar: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  Shield: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Briefcase: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>,
  Zap: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Crown: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 20h20l-2-14-5 5-3-7-3 7-5-5z"/><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2"/></svg>,
  Diamond: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 3h12l4 6-10 13L2 9z"/><path d="M2 9h20"/><path d="M10 3l-4 6 6 13 6-13-4-6"/></svg>,
  Building: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="1"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg>,
};

// ─── FULL NEWS ARTICLES ───
const NEWS_ITEMS = [
  {
    id: 1, category: "ENTREPRENEURSHIP", date: "Feb 18, 2026",
    title: "BIF Launches Pan-African Youth Startup Accelerator in Partnership with Afreximbank",
    excerpt: "A new initiative aims to support 500 young entrepreneurs across 15 African countries, providing mentorship, seed funding, and global market access through BIF's expanding network.",
    image: "linear-gradient(135deg, #D4A843 0%, #8B6914 100%)",
    featured: true,
    body: [
      "The Black Impact Foundation has announced a landmark partnership with the African Export-Import Bank (Afreximbank) to launch the Pan-African Youth Startup Accelerator — a programme designed to identify, support, and scale the most promising ventures led by young entrepreneurs across the continent.",
      "The initiative, which will operate across 15 African countries including Nigeria, Kenya, South Africa, Ghana, Rwanda, and Senegal, represents one of the most ambitious entrepreneurship programmes ever undertaken by a foundation focused on the global Black community. It will provide participants with structured mentorship from established business leaders, seed funding of up to $25,000 per venture, and critically, direct access to BIF's global network of investors, corporate partners, and diaspora professionals.",
      "\"For too long, the narrative around African entrepreneurship has been shaped by outsiders looking in,\" said Clarence Seedorf, Chairman of BIF, speaking at the programme's launch in Johannesburg. \"This accelerator is built by our community, for our community. The talent is already here — what we are providing is the infrastructure, the connections, and the capital to let that talent flourish on its own terms.\"",
      "The programme comes at a critical moment. While Africa's startup ecosystem has grown significantly over the past decade, funding remains disproportionately concentrated in a handful of countries and sectors. Young entrepreneurs in francophone West Africa, East Africa, and Southern Africa outside of South Africa have historically faced steeper barriers to accessing capital and mentorship networks.",
      "BIF's approach is deliberately different from traditional accelerator models. Rather than requiring participants to relocate, the programme operates through a hybrid model combining virtual workshops, regional hubs, and an annual convergence at the Global Black Impact Summit. This structure acknowledges a reality that many accelerator programmes ignore: uprooting founders from their communities and markets can be counterproductive.",
      "The partnership with Afreximbank also signals a broader shift in how African financial institutions are engaging with grassroots entrepreneurship. Afreximbank has committed not only funding but also trade finance expertise, helping accelerator graduates navigate cross-border commerce and access pan-African markets under the African Continental Free Trade Area (AfCFTA).",
      "Applications open on March 15, 2026, with the first cohort set to begin in June. BIF has indicated that at least 40% of places will be reserved for women-led ventures, reflecting the foundation's commitment to gender equity within its programmes.",
      "The accelerator represents a tangible step toward BIF's broader vision: a globally connected Black community where economic empowerment is not an aspiration but a reality. As Seedorf noted, \"We are not here to create dependency. We are here to create independence — and the confidence that comes with it.\""
    ]
  },
  {
    id: 2, category: "GLOBAL SUMMIT", date: "Feb 12, 2026",
    title: "GBIS 2026 Announced: 'Unity Through Innovation' Theme Set for Abu Dhabi",
    excerpt: "The Global Black Impact Summit returns with an expanded program featuring tech innovation labs, investment roundtables, and cultural showcases across three days.",
    image: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
    body: [
      "The Black Impact Foundation has officially announced that the Global Black Impact Summit (GBIS) 2026 will take place from November 19–21 in Abu Dhabi, United Arab Emirates, under the theme \"Unity Through Innovation.\" The event expands to three days for the first time, reflecting the growing scope and ambition of what has become the premier gathering for the global Black community.",
      "Since its inception, GBIS has grown from a focused gathering of community leaders into a multi-sector platform that bridges continents, industries, and generations. The 2024 edition in Dubai brought together delegates from over 30 countries for discussions spanning finance, sports, fashion, energy, and entrepreneurship. The 2026 summit intends to build on that momentum with a significantly expanded programme.",
      "New additions include a dedicated Technology & Innovation Lab, where startups from the BIF accelerator programme will showcase their solutions alongside established tech companies. An Investment Roundtable series will connect pre-vetted entrepreneurs with impact investors and venture capital firms committed to funding Black-led businesses. And for the first time, GBIS will host a Cultural Heritage Pavilion featuring artists, filmmakers, musicians, and historians from across the African diaspora.",
      "\"Innovation is not just about technology,\" said NJ Ayuk, Vice Chairman of BIF and Executive Chairman of the African Energy Chamber. \"It is about innovative thinking in how we organise our communities, how we invest in each other, and how we tell our own stories. GBIS 2026 brings all of these dimensions together under one roof.\"",
      "The summit will also feature the return of the Dragon's Den pitch competition, which has become a highlight of GBIS events. Six selected startups will pitch to a panel of investors for funding commitments, with previous editions generating significant capital connections for participants. The Black Excellence Awards Gala Dinner will close the summit, recognising outstanding contributions across eight categories.",
      "A notable shift in the 2026 edition is the introduction of a dedicated Youth Programme for delegates aged 18–30, including subsidised attendance, mentorship speed-dating sessions, and a Young Leaders Forum. BIF has acknowledged that while its events attract accomplished professionals, creating accessible pathways for emerging leaders is essential to fulfilling its mission.",
      "Registration opens April 1, 2026, with early-bird pricing available for BIF members. Gold and Platinum members receive complimentary attendance, while Enterprise members can bring delegations of up to 20 people.",
      "The choice of Abu Dhabi reflects BIF's strategic relationship with the Gulf region, which has become an increasingly important hub for the African diaspora and for investment flows between Africa and the Middle East. It also underscores a practical reality: the UAE's visa accessibility for African passport holders makes it one of the few global destinations where delegates from across the continent can convene without the bureaucratic hurdles that plague conferences held in Europe or North America."
    ]
  },
  {
    id: 3, category: "EDUCATION", date: "Feb 5, 2026",
    title: "BIF Scholarship Programme Awards 200 Students Across the Diaspora",
    excerpt: "Students from 28 countries receive full scholarships in STEM, business, and arts through BIF's commitment to educational empowerment and generational change.",
    image: "linear-gradient(135deg, #2d1b69 0%, #11998e 100%)",
    body: [
      "The Black Impact Foundation's Education Pillar has announced the awarding of 200 full scholarships to students of African heritage across 28 countries, covering undergraduate and postgraduate programmes in STEM, business, law, and the arts. The 2026 cohort represents the largest intake since the programme's founding and signals a significant scaling of BIF's educational investment.",
      "The scholarships, funded through a combination of BIF membership revenues, corporate partnerships, and individual donations, cover tuition, living expenses, and — crucially — access to BIF's mentorship and professional networking ecosystem. This last element distinguishes the programme from purely financial aid: recipients are connected with professionals in their field, invited to BIF events, and given ongoing career development support throughout their studies.",
      "\"A scholarship that ends at graduation has done only half its job,\" said Rachel Drielinger, Treasurer of BIF's Board. \"What we have built is a pipeline — from education to mentorship to employment to entrepreneurship. The scholarship is the entry point, not the destination.\"",
      "The geographic distribution of this year's cohort reflects BIF's genuinely global reach. Recipients come from across West, East, and Southern Africa, the Caribbean, South America, Europe, and North America. Notably, 34 scholarships were awarded to students in countries where access to quality higher education remains severely limited, including the Democratic Republic of Congo, Haiti, and South Sudan.",
      "The programme has also begun addressing a systemic issue that rarely makes headlines: the experience of students of African heritage studying in countries where they are a small minority. BIF has partnered with student organisations and university diversity offices across 12 European countries to provide pastoral support networks, ensuring that scholarship recipients are not only funded but also supported through the social and cultural challenges of studying abroad.",
      "This year's cohort includes aspiring engineers, medical researchers, climate scientists, artists, and legal scholars. While the foundation deliberately avoids prescribing career paths, there is a clear emphasis on fields where people of African heritage remain underrepresented — not because other fields are less valuable, but because structural barriers in these areas are most acute.",
      "For BIF, the scholarship programme is an investment in the future leadership of the global Black community. Many alumni of earlier cohorts are already giving back — as mentors, as donors, and as advocates for expanding the programme further. That cycle of generational uplift is precisely what the foundation was designed to create.",
      "Applications for the 2027 cohort will open in September 2026. BIF encourages potential applicants to join the Community membership tier (free) to receive notifications and preparatory resources."
    ]
  },
  {
    id: 4, category: "COMMUNITY", date: "Jan 28, 2026",
    title: "Clarence Seedorf Keynotes African Energy Week: Building Sustainable Futures",
    excerpt: "BIF Chairman emphasises the intersection of energy independence and community empowerment at the continent's premier energy conference in Cape Town.",
    image: "linear-gradient(135deg, #0c0c0c 0%, #434343 100%)",
    body: [
      "Speaking to a packed auditorium at African Energy Week (AEW) in Cape Town, Black Impact Foundation Chairman Clarence Seedorf delivered a keynote address that challenged conventional thinking about the relationship between energy development and community empowerment on the African continent.",
      "Seedorf's central argument was direct: energy independence is not merely an economic issue but a foundational element of community sovereignty. Without reliable, affordable, and locally controlled energy infrastructure, communities across Africa remain dependent on external actors whose priorities do not always align with local needs.",
      "\"We talk about empowerment in many contexts — economic empowerment, educational empowerment, political empowerment,\" Seedorf told delegates. \"But all of these rest on a foundation that is often overlooked: energy. You cannot build a business if the lights go out every afternoon. You cannot educate children if their schools have no electricity. Energy is not separate from our mission — it is central to it.\"",
      "The address, which came during a panel titled \"Making Impact Together,\" also highlighted the partnership between BIF and the African Energy Chamber (AEC), formalised in 2023 with an agreement to promote opportunities for youth and the broader global Black community within the energy sector. Seedorf pointed to concrete outcomes of that partnership, including internship placements for 150 young professionals across energy companies operating in Africa.",
      "However, Seedorf was also candid about the tensions inherent in Africa's energy transition. While international pressure to leapfrog fossil fuels is understandable from a climate perspective, he argued that imposing transition timelines designed for wealthy nations onto countries still struggling with basic energy access is both impractical and unjust.",
      "\"Africa contributes approximately 3% of global emissions. Three percent. And yet, African nations are being asked to bear a disproportionate share of the transition burden while the countries most responsible for the climate crisis continue to debate their own commitments. We must be honest about this imbalance, even as we work toward sustainable solutions.\"",
      "This kind of forthright commentary has become characteristic of BIF's approach: advocating for the interests of the global Black community without shying away from complexity or from positions that might unsettle some allies. It reflects a broader philosophy that genuine empowerment requires honest dialogue, not just consensus.",
      "Following the keynote, BIF announced that energy sector programming will be expanded at GBIS 2026, with dedicated sessions on renewable energy entrepreneurship, African energy policy, and community-owned energy projects. The foundation also confirmed that AEW 2026 delegates will be offered exclusive access to BIF's Corporate Foundation Membership programme."
    ]
  },
  {
    id: 5, category: "POLICY", date: "Jan 20, 2026",
    title: "BIF Advocates for Inclusive Digital Infrastructure at World Economic Forum",
    excerpt: "Foundation representatives present research on bridging the digital divide in Black communities worldwide, calling for equitable tech investment frameworks.",
    image: "linear-gradient(135deg, #2C3E50 0%, #4CA1AF 100%)",
    body: [
      "Representatives of the Black Impact Foundation presented research findings at the World Economic Forum's Annual Meeting in Davos, calling for a fundamental rethinking of how digital infrastructure investment is designed, funded, and deployed in communities of African heritage worldwide.",
      "The research, conducted in partnership with academic institutions across three continents, documents a persistent digital divide that affects Black communities not only in Africa but in Europe, the Americas, and the Caribbean. While global internet penetration has increased dramatically over the past decade, the quality of access — connection speed, affordability relative to income, digital literacy support, and availability of locally relevant content — remains sharply unequal along racial and geographic lines.",
      "\"Connectivity is not the same as inclusion,\" the BIF presentation stated. \"A community that has internet access but cannot afford data, or that has data but no digital skills training, or that has skills but finds that the platforms and tools available do not serve their needs — that community is connected on paper but excluded in practice.\"",
      "The presentation outlined a framework for what BIF terms \"inclusive digital infrastructure\" — an approach that goes beyond laying fibre optic cables and building cell towers to encompass the full ecosystem required for communities to genuinely benefit from digital technologies. This includes affordable device access, digital literacy programmes tailored to local contexts, support for local tech entrepreneurs building context-relevant solutions, and policy frameworks that protect users from exploitation.",
      "BIF's advocacy on this issue is rooted in a practical observation: many of the foundation's own programmes — from its entrepreneurship accelerator to its scholarship programme to its community networking platform — depend on participants having reliable, affordable digital access. The digital divide is not an abstract policy issue for BIF; it is a direct barrier to the foundation's mission.",
      "The Davos presentation received a mixed but engaged reception. Several participants from the technology sector acknowledged the gaps described but questioned whether the proposed framework was feasible at scale. Others noted that BIF's community-centred approach offers a valuable counterpoint to top-down digital development models that have frequently failed to deliver equitable outcomes.",
      "BIF has announced that a full report will be published in Q2 2026, with policy recommendations directed at national governments, multilateral institutions, and technology companies. The foundation is also exploring the creation of a Digital Inclusion Fund, financed through its membership and partnership revenues, to provide direct grants to community-based digital access initiatives.",
      "The initiative reflects BIF's evolving role as not just a community platform but an increasingly influential voice in global policy discussions affecting people of African heritage. As Seedorf has noted on multiple occasions, advocacy without economic independence is precarious — but economic independence without policy change is insufficient."
    ]
  },
  {
    id: 6, category: "CULTURE", date: "Jan 14, 2026",
    title: "Black Excellence Awards 2026: Nominations Now Open Across Eight Categories",
    excerpt: "Recognising outstanding contributions in leadership, arts, science, sports, entrepreneurship, education, community service, and innovation worldwide.",
    image: "linear-gradient(135deg, #D4A843 0%, #2d1b69 100%)",
    body: [
      "The Black Impact Foundation has opened nominations for the 2026 Black Excellence Awards, the foundation's annual recognition of outstanding individuals whose work advances the interests, achievements, and visibility of the global Black community. The awards, which will be presented at the GBIS 2026 Gala Dinner in Abu Dhabi, span eight categories: Leadership, Arts & Culture, Science & Research, Sports, Entrepreneurship, Education, Community Service, and Innovation.",
      "The awards were established by the Black Excellence Foundation, an affiliate of BIF, to celebrate achievements that might otherwise go unrecognised by mainstream institutions. Previous recipients include NJ Ayuk, recognised for his contributions to African energy development; Sabrina Ben Salmi, honoured for her advocacy work; and former NBA player Luol Deng, who received the Legacy Award for his community development efforts in South Sudan.",
      "\"The world is full of award ceremonies,\" said Vincent Hooplot, BIF Board Member and chair of the awards selection committee. \"What makes the Black Excellence Awards different is that they are defined by our community, for our community. The criteria are not about commercial success alone — they are about impact, about service, about the kind of excellence that lifts others as it rises.\"",
      "This year's expanded categories reflect BIF's broadening scope. The Innovation category, new for 2026, recognises individuals pioneering solutions to challenges faced by Black communities — whether in technology, healthcare, finance, or governance. The Education category has been broadened to include not only traditional educators but also mentors, coaches, and community leaders whose work creates learning opportunities outside formal institutions.",
      "Nominations are open to anyone and can be submitted through the BIF Community platform. Self-nominations are encouraged. All nominees are reviewed by a selection committee comprising previous award recipients, BIF board members, and independent advisors. Shortlisted nominees will be announced in September 2026, with winners revealed at the Gala Dinner in November.",
      "The awards serve a function beyond ceremony. Previous recipients have reported increased visibility, new partnership opportunities, and enhanced credibility in their work. For BIF, the awards are a tool for narrative change — demonstrating to global audiences that Black excellence is not exceptional but pervasive, not confined to entertainment and sports but present across every domain of human achievement.",
      "There is also a deliberate effort to ensure geographic diversity among recipients. While previous ceremonies have naturally attracted nominations concentrated in English-speaking countries, BIF has launched outreach in francophone Africa, lusophone countries, and the Caribbean to ensure the awards reflect the full breadth of the global Black community.",
      "Nominations close on July 31, 2026. Full details and the nomination form are available on the BIF Community platform. BIF members at all tiers can nominate, with Silver, Gold, and Platinum members also eligible to serve on regional selection panels."
    ]
  }
];

// ─── FULL INSIGHT ARTICLES ───
const INSIGHTS = [
  {
    id: 1, type: "CASE STUDY", readTime: "8 min",
    title: "From Accra to Amsterdam: How a BIF Mentorship Programme Transformed a Tech Startup",
    excerpt: "When Kwame Asante joined BIF's entrepreneurship network in 2023, his edtech platform served 200 students. Today, it reaches over 50,000 across West Africa and Europe.",
    tag: "Entrepreneurship",
    body: [
      "In 2023, Kwame Asante was running a small educational technology platform from a co-working space in Accra, Ghana. The platform, designed to provide affordable STEM tutoring to secondary school students, had around 200 active users and was sustained largely through Asante's personal savings and a modest grant from a local foundation. The technology worked. The demand was there. What was missing was the infrastructure to scale — and the network to make scaling possible.",
      "Asante's trajectory changed when he was accepted into BIF's Entrepreneurship Pillar mentorship programme, which paired him with a mentor based in Amsterdam who had experience scaling technology businesses across multiple markets. The mentorship was not about imposing a Western business model onto an African context. It was about helping Asante identify and address the specific barriers to growth he was facing: payment infrastructure challenges, content localisation for multiple West African curricula, and the perennial problem of reliable internet access in the communities his platform aimed to serve.",
      "Over 18 months, the mentorship evolved into a broader relationship with BIF's network. Through introductions made at GBIS 2024 in Dubai, Asante connected with an impact investor focused on African education technology. That connection led to a seed round that funded the platform's expansion into Côte d'Ivoire, Senegal, and — unexpectedly — a pilot programme serving diaspora communities in the Netherlands and Belgium.",
      "The Dutch expansion was catalysed by BIF's community network itself. Members in Amsterdam who learned about the platform through BIF's newsletter recognised a need among African and Caribbean diaspora families for supplementary education that reflected their cultural context. Within six months, the European pilot had enrolled 3,000 students.",
      "Today, Asante's platform serves over 50,000 students across seven countries. The team has grown from three to twenty-eight. And Asante himself has become a mentor in BIF's programme, working with two early-stage founders in Nigeria and Kenya.",
      "This case illustrates something important about how BIF's model works — and why it works. The foundation did not provide Asante with a large grant or a prescriptive business plan. It provided something more valuable and more sustainable: a relationship. A mentor who understood his context. A network that opened doors he did not know existed. And a community that saw his work and said, \"This matters — how can we help?\"",
      "It also illustrates a candid reality: the global startup ecosystem is not a level playing field. An edtech founder in Accra faces challenges that a counterpart in Amsterdam or San Francisco simply does not — from payment processing barriers to the basic reliability of electricity. BIF's role is not to pretend these disparities do not exist, but to build the connective tissue that helps founders navigate them.",
      "Asante's story is one of many emerging from BIF's programmes. Not all will achieve the same scale. But each represents a node in a growing network of Black entrepreneurs who are building businesses, creating employment, and demonstrating — through results, not rhetoric — what is possible when talent meets opportunity."
    ]
  },
  {
    id: 2, type: "HISTORY", readTime: "12 min",
    title: "The Moors of Europe: Eight Centuries of African Influence on Western Civilisation",
    excerpt: "From advanced mathematics and medicine to architecture and agriculture, the Moorish presence in the Iberian Peninsula from 711 to 1492 CE fundamentally shaped European civilisation.",
    tag: "Heritage",
    body: [
      "When Tariq ibn Ziyad led a force across the Strait of Gibraltar in 711 CE, he initiated a period of African and Islamic presence in Europe that would last for nearly eight centuries. The Moors — a term used to describe the Muslim inhabitants of North and West Africa who settled in the Iberian Peninsula — did not merely occupy territory. They transformed it. And in doing so, they fundamentally shaped the trajectory of what would become Western civilisation.",
      "This is a history that European educational systems have systematically marginalised. The story of medieval Europe is typically told as a narrative of Christian kingdoms gradually reclaiming territory from foreign invaders. What this framing obscures is that during much of this period, Moorish Iberia — Al-Andalus — was the most advanced civilisation in Europe by virtually every measurable standard.",
      "The city of Córdoba, the Moorish capital, had a population of over 500,000 at a time when London and Paris had perhaps 30,000 inhabitants each. It had paved and illuminated streets, running water, public baths, and a library containing over 400,000 volumes — at a time when the largest library in Christian Europe held perhaps 400 books. The University of Córdoba attracted scholars from across the known world, including Christians and Jews, who studied alongside Muslims in an atmosphere of intellectual exchange that would not be replicated in Europe for centuries.",
      "The contributions were not abstract. Moorish scholars preserved, translated, and advanced the works of Greek and Roman antiquity, transmitting them back to a European continent that had largely lost access to its own classical heritage. The works of Aristotle, Galen, Ptolemy, and Euclid survived in part because Moorish scholars translated them into Arabic, studied them, built upon them, and eventually facilitated their translation into Latin.",
      "In mathematics, the Moors introduced the decimal system and the concept of zero to Europe — technologies so fundamental to modern life that their origins are rarely considered. Algebra (from the Arabic al-jabr) was formalised by scholars working in Moorish Iberia. In medicine, Moorish physicians developed surgical techniques, pharmacology, and public health practices that were centuries ahead of their European contemporaries. In agriculture, the Moors transformed the arid landscape of southern Spain through sophisticated irrigation systems, introducing crops including oranges, lemons, cotton, rice, and sugarcane.",
      "Architecturally, the legacy is visible to this day. The Alhambra in Granada, the Great Mosque of Córdoba (now a cathedral), and the Alcázar of Seville are not merely tourist attractions — they are evidence of a civilisation that valued beauty, precision, and mathematical harmony in its built environment to a degree that European architecture would not match for centuries.",
      "The question that this history raises — and that BIF's Insights programme exists to explore — is not merely one of historical accuracy. It is a question of narrative. Who gets to claim the legacy of civilisation? Whose contributions are centred, and whose are erased?",
      "The Reconquista, which culminated in 1492 with the fall of Granada, was followed by the systematic destruction of Moorish culture: book burnings, forced conversions, and the eventual expulsion of Muslims and Jews from the peninsula. The cultural cleansing was remarkably effective. Within a few generations, the depth of Africa's contribution to European civilisation was obscured — reframed as a period of occupation rather than a period of enrichment.",
      "Recovering this history is not about claiming superiority. It is about claiming completeness. The story of human progress is a shared story, and any version that erases the contributions of African peoples is not only unjust — it is inaccurate. For communities of African heritage worldwide, understanding this history is an act of intellectual reclamation: a reminder that the capacity for excellence is not new, not exceptional, and not contingent on anyone else's validation."
    ]
  },
  {
    id: 3, type: "STORY", readTime: "6 min",
    title: "Breaking Barriers: The Rise of Black Founders in European Venture Capital",
    excerpt: "A new generation of entrepreneurs of African heritage are securing record-level funding across London, Amsterdam, Paris, and Berlin.",
    tag: "Innovation",
    body: [
      "For decades, the European venture capital landscape has been characterised by a stark homogeneity. Founders funded by European VCs have overwhelmingly come from a narrow demographic profile — and Black founders have been almost entirely excluded from the capital flows that turn promising ideas into transformative companies.",
      "That picture is beginning to change. Across London, Amsterdam, Paris, and Berlin, a growing cohort of entrepreneurs of African heritage are securing funding at levels that would have been unthinkable a decade ago. In 2025, Black-founded startups in Europe raised a combined €1.2 billion — still a fraction of total European VC investment, but a significant increase from the €340 million recorded in 2020.",
      "The growth is driven by several converging factors. First, a genuine expansion of entrepreneurial talent. Initiatives like BIF's Entrepreneurship Pillar, the Afro-Caribbean Business Network, and various national programmes have created pipelines of founders who are better prepared, better connected, and better positioned to attract institutional investment.",
      "Second, the emergence of investors who understand the market opportunity. Funds like Impact X Capital, which focuses on underrepresented founders in Europe, have demonstrated that investing in Black-led companies is not philanthropy but strategy. The returns speak for themselves, gradually eroding the unconscious (and sometimes conscious) bias that has historically excluded Black founders from investor portfolios.",
      "But it would be dishonest to paint an entirely optimistic picture. The structural barriers remain formidable. Black founders in Europe still report that they are held to higher evidentiary standards than their white counterparts, that their market insights are more frequently questioned, and that they are disproportionately steered toward \"diversity funding\" rather than mainstream investment channels.",
      "There is also a geographic concentration problem. The majority of VC funding for Black founders is concentrated in London, with Amsterdam a distant second. Founders in Paris, Berlin, and smaller European cities face additional barriers including language, regulatory complexity, and thinner networks of supportive investors.",
      "What the BIF community provides — and what makes networks like this indispensable — is the connective tissue that helps founders navigate these realities. Introductions to the right investors. Peer support from founders who have been through the same process. And the quiet, practical knowledge that comes from community: which investors actually write cheques versus which ones take meetings to appear diverse; which accelerators provide genuine value versus which extract equity for minimal support.",
      "The trajectory is encouraging. But the honest assessment is that Europe's Black founder ecosystem is at an early stage of maturity. Achieving genuine equity in venture capital will require sustained effort over decades — from investors willing to examine their own biases, from institutions willing to restructure their processes, and from communities like BIF that continue to build the infrastructure of support from the ground up."
    ]
  },
  {
    id: 4, type: "HISTORY", readTime: "15 min",
    title: "The Kingdom of Kush: Africa's Forgotten Superpower That Rivalled Egypt",
    excerpt: "For over a thousand years, the Kushite civilisation in present-day Sudan built pyramids, developed their own writing system, and at one point conquered and ruled all of Egypt.",
    tag: "Heritage",
    body: [
      "In the popular imagination, ancient African civilisation begins and ends with Egypt. The pyramids of Giza, the Sphinx, the treasures of Tutankhamun — these form the dominant narrative of Africa's ancient past, often framed in ways that subtly disconnect Egypt from the broader African continent. But south of Egypt, along the Nile in what is now Sudan, a civilisation emerged that was in many respects Egypt's equal — and at times, its conqueror.",
      "The Kingdom of Kush, centred on the cities of Kerma, Napata, and Meroë, flourished for over a thousand years, from approximately 1070 BCE to 350 CE. At its zenith, Kush controlled territory from the confluence of the Blue and White Niles to the southern border of Egypt. Its rulers built more pyramids than Egypt — over 200 in total, clustered at sites like Meroë and Nuri. They developed their own writing system, Meroitic, which remains only partially deciphered to this day. They produced ironwork on an industrial scale, operated sophisticated trade networks connecting sub-Saharan Africa with the Mediterranean world, and maintained a military capable of projecting power across vast distances.",
      "The most dramatic demonstration of Kushite power came in the 8th century BCE, when King Piye marched north and conquered the entirety of Egypt, establishing what historians call the 25th Dynasty. For nearly a century, Kushite pharaohs ruled both kingdoms, overseeing a period of cultural renaissance that included the restoration of neglected temples, the revival of traditional Egyptian artistic styles, and significant building programmes at Karnak and other major sites.",
      "The Kushite pharaohs did not attempt to erase Egyptian culture or impose an alien civilisation. They saw themselves — with considerable justification — as restorers of a shared Nile Valley tradition that Egypt's own internal conflicts had degraded. This nuance is important because it challenges the simplistic framing of Kush as merely an imitation of Egypt. The relationship between the two civilisations was dynamic, reciprocal, and complex.",
      "After the Assyrian invasion forced Kushite rulers to withdraw from Egypt in the 7th century BCE, the kingdom's centre of gravity shifted south to Meroë. Far from declining, Meroitic Kush entered a new period of innovation. The city of Meroë became one of the ancient world's major iron production centres — its slag heaps were so vast that early European archaeologists called it \"the Birmingham of ancient Africa.\" The Meroitic script was developed during this period, representing one of the earliest indigenous writing systems in sub-Saharan Africa.",
      "The sophistication of Kushite society extended beyond military and industrial achievement. Archaeological evidence reveals a complex social structure, vibrant artistic traditions, and a religious system that blended indigenous African practices with elements adapted from Egyptian tradition. Women held significant political power — a series of queens known as Kandakes (from which the name Candace derives) ruled the kingdom in their own right, commanding armies and conducting diplomacy with powers including Rome.",
      "The decline of Kush, which occurred gradually over the 3rd and 4th centuries CE due to a combination of environmental change, trade route shifts, and military pressure from the Aksumite kingdom, does not diminish its significance. For over a millennium, Kush demonstrated that advanced civilisation in sub-Saharan Africa was not an import from elsewhere but an indigenous development — one that at its peak rivalled and even surpassed its more famous northern neighbour.",
      "The relative obscurity of Kush in global education is itself instructive. It reveals the mechanisms by which certain histories are elevated and others suppressed — not through explicit censorship, but through patterns of emphasis, funding, and scholarly attention that reflect and reinforce existing hierarchies of value. Recovering the history of Kush is not antiquarianism. It is an act of intellectual justice and a reminder that the narrative of African civilisation is far richer, far older, and far more consequential than most of the world has been taught to believe."
    ]
  },
  {
    id: 5, type: "CASE STUDY", readTime: "7 min",
    title: "Collective Economics: How the BIF Community Fund Model Is Empowering Diaspora Investment",
    excerpt: "BIF's innovative community investment circles have channelled over €2.5 million into Black-owned businesses since 2023.",
    tag: "Economics",
    body: [
      "The concept of collective economics — pooling resources within a community to fund community-owned or community-serving enterprises — is not new. It has deep roots in African traditions of communal saving and lending, from the Susu system of West Africa to the Stokvel tradition of Southern Africa to the Pardner system of the Caribbean. What BIF has done is adapt this time-tested model for a globalised, digital context — and the results have been striking.",
      "Since launching its Community Investment Circles in 2023, BIF has facilitated the pooling and deployment of over €2.5 million into Black-owned businesses across 14 countries. The model is straightforward: groups of BIF members contribute monthly to a shared fund, which is then invested in vetted businesses through a combination of equity stakes, revenue-sharing agreements, and low-interest loans. Each circle is managed by a trained facilitator and governed by clear rules developed collaboratively by participants.",
      "The businesses funded range from a logistics company in Lagos to a natural cosmetics brand in Suriname to a chain of coding academies in South London. What they share is a combination of commercial viability and community impact — the dual criteria that BIF's investment committees apply when evaluating opportunities.",
      "The model addresses a structural problem that Black entrepreneurs worldwide know intimately: the difficulty of accessing capital through conventional channels. Studies consistently show that Black business owners are more likely to be denied bank loans, receive smaller loans when approved, and face higher interest rates than comparable white-owned businesses. Community investment circles bypass these gatekeepers entirely, replacing institutional bias with community trust.",
      "This is not to suggest the model is without challenges. Managing collective investment across multiple jurisdictions introduces legal and regulatory complexity. Ensuring adequate due diligence on funded businesses requires expertise that not all circle facilitators initially possess. And the returns — while generally positive — are subject to the same market risks as any investment.",
      "BIF has addressed these challenges through infrastructure investment: legal frameworks developed with pro bono support from law firms in the BIF network; a due diligence toolkit created in partnership with finance professionals among BIF's membership; and a facilitator training programme that has now certified over 60 circle leaders across three continents.",
      "The impact extends beyond financial returns. Participants consistently report that the circles have deepened their sense of connection to the broader Black community, increased their financial literacy, and given them a tangible sense of agency over the economic development of their communities. Several circle members have gone on to start businesses themselves, inspired by the entrepreneurs they helped fund.",
      "For BIF, the Community Investment Circles represent a practical embodiment of the foundation's philosophy: that the global Black community possesses, within itself, the resources, talent, and institutional knowledge to drive its own economic development. External support is welcome. But dependency on external support is not the goal. The goal is sovereignty — financial, economic, and ultimately, collective."
    ]
  },
  {
    id: 6, type: "STORY", readTime: "10 min",
    title: "Reclaiming the Narrative: African Scientists Leading Global Climate Research",
    excerpt: "From agricultural innovations to cutting-edge renewable energy research, African scientists are at the forefront of solving humanity's greatest challenge.",
    tag: "Science",
    body: [
      "When the Intergovernmental Panel on Climate Change published its most recent assessment report, a significant share of the contributing authors were African scientists. This fact surprised many observers — which itself reveals the persistence of assumptions about where scientific expertise resides. African researchers are not newcomers to climate science. They have been contributing to the field for decades. What is new is that their work is becoming harder to ignore.",
      "The contributions are both theoretical and intensely practical. In agriculture, researchers across the continent are developing climate-resilient crop varieties, water-efficient farming techniques, and early warning systems for drought and flooding that serve hundreds of millions of people. In energy, African scientists and engineers are pioneering decentralised solar and wind systems designed for off-grid communities — solutions that are increasingly being studied and adapted by researchers in other developing regions.",
      "Dr. Agnes Kalibata, the Rwandan agricultural scientist who served as the UN Secretary-General's Special Envoy to the 2021 Food Systems Summit, exemplifies the kind of leadership that is reshaping global discussions. Her work on agricultural transformation in Africa directly challenges the assumption that food security and environmental sustainability are competing objectives.",
      "In South Africa, researchers at institutions like the University of Cape Town and Stellenbosch University are conducting world-class research on carbon capture, sustainable urban design, and the socio-economic dimensions of climate transition. In Kenya, the collaboration between local universities and international research centres has produced breakthrough work on geothermal energy and agroforestry. In Nigeria, scientists are developing innovative approaches to waste management and circular economy principles tailored to the realities of rapidly growing urban centres.",
      "What makes these contributions particularly significant is their context-specificity. Climate solutions developed in wealthy, temperate countries often fail when transplanted to tropical, resource-constrained settings. African scientists, working within and for their communities, produce solutions that account for local conditions — not as an afterthought but as a starting point.",
      "Yet the structural inequities in global science persist. African researchers receive a disproportionately small share of global research funding. Their work is published less frequently in high-impact journals — not because of quality, but because of systemic biases in peer review and editorial processes. And the brain drain that draws talented scientists to better-funded institutions in Europe and North America continues to deplete the continent's research capacity.",
      "BIF's Research Pillar engages with these dynamics through scholarship funding, research dissemination support, and advocacy for equitable global research frameworks. The foundation's position is clear: Africa should not be merely a site of research conducted by outsiders. African scientists should lead the research agenda on issues that affect their communities — and they should be funded, published, and credited accordingly.",
      "The climate crisis will not be solved by any single region or scientific tradition. It demands the full breadth of human ingenuity — which means that marginalising the contributions of African scientists is not only unjust but strategically foolish. For BIF, amplifying these contributions is both a matter of principle and of pragmatism: the community that produced solutions for managing arid landscapes for millennia has knowledge that the entire world needs."
    ]
  },
  {
    id: 7, type: "HISTORY", readTime: "14 min",
    title: "Mansa Musa and the Mali Empire: The Richest Person in Human History",
    excerpt: "In 1324, Mansa Musa's pilgrimage to Mecca disrupted economies across North Africa and the Mediterranean. The Mali Empire's wealth and scholarship were unmatched.",
    tag: "Heritage",
    body: [
      "In 1324, a caravan left the city of Niani, capital of the Mali Empire in West Africa, and set out on a journey that would reshape the economic landscape of the medieval world. At its head was Mansa Musa, the tenth emperor of Mali, accompanied by an entourage estimated at 60,000 people, including 12,000 servants each carrying four pounds of gold. The caravan also included 80 camels, each loaded with 300 pounds of gold dust. The total value of the gold Musa carried has been estimated at approximately $400 billion in today's currency.",
      "When Musa arrived in Cairo during his pilgrimage to Mecca, his generosity was so extraordinary — distributing gold freely to the poor, to officials, to merchants — that the sudden influx of precious metal destabilised the Egyptian economy. The price of gold crashed and did not fully recover for over a decade. A single individual's wealth was so vast that it disrupted the currency markets of an entire region. No person before or since has had that kind of economic impact through personal wealth alone.",
      "But Mansa Musa's significance extends far beyond his wealth. The Mali Empire he ruled was one of the most sophisticated states in the medieval world. It encompassed an area roughly the size of Western Europe, controlling the trans-Saharan trade routes that linked West Africa's gold and salt deposits to the markets of North Africa, the Middle East, and Europe. The empire's governance system, based on a combination of centralised authority and local autonomy, maintained stability across a vast and ethnically diverse territory for over two centuries.",
      "Perhaps Musa's most enduring legacy was his investment in education and scholarship. Upon returning from his pilgrimage, he embarked on an ambitious building programme that included the expansion of the Great Mosque of Djenné and the establishment of the Sankore Madrasah in Timbuktu. Under his patronage, Timbuktu became one of the world's premier centres of learning, attracting scholars from across Africa, the Middle East, and even Europe. The university housed hundreds of thousands of manuscripts covering mathematics, astronomy, medicine, law, history, and theology.",
      "The Timbuktu manuscripts — tens of thousands of which survive to this day — represent one of the most important collections of pre-colonial African intellectual production. They demonstrate, beyond any reasonable dispute, that sub-Saharan Africa possessed a sophisticated written intellectual tradition centuries before European colonisation. The ongoing preservation and digitisation of these manuscripts, supported by organisations including UNESCO and various African cultural institutions, is gradually making this legacy accessible to a global audience.",
      "Musa's pilgrimage also put West Africa on the map — literally. The 1375 Catalan Atlas, one of the most important medieval European maps, prominently features Mansa Musa holding a gold nugget, with an inscription acknowledging him as the richest ruler in the region. European merchants, previously focused on North African trading partners, began looking south with renewed interest — a shift that would have profound and eventually devastating consequences as it contributed to the dynamics that led to European exploration and colonisation of sub-Saharan Africa.",
      "The history of Mansa Musa and the Mali Empire matters today not merely as a corrective to historical ignorance, though it is certainly that. It matters because it challenges a narrative — deeply embedded in global education and popular culture — that wealth, sophistication, and civilisational achievement are historically the province of Europe and Asia, with Africa serving as a passive backdrop. The reality is precisely the opposite: medieval West Africa was one of the wealthiest, most learned, and most culturally dynamic regions on earth.",
      "For communities of African heritage, this history provides something that no amount of contemporary achievement alone can supply: depth. The knowledge that excellence is not a recent development but a continuation of a tradition stretching back centuries and millennia provides a foundation of identity that is both historically grounded and forward-looking. BIF's Insights programme exists to make these histories accessible, to present them with the rigour and respect they deserve, and to ensure that the next generation inherits not a fragmented story but a complete one."
    ]
  },
  {
    id: 8, type: "CASE STUDY", readTime: "9 min",
    title: "Digital Bridges: How BIF's Online Platform Connected 10,000 Professionals Globally",
    excerpt: "The BIF Connect initiative has created an unprecedented digital network linking professionals of African heritage across six continents.",
    tag: "Community",
    body: [
      "When BIF launched its online community platform in 2023, the immediate question was whether a digital network could replicate the depth of connection that the foundation's in-person events, particularly the Global Black Impact Summit, had fostered. The answer, three years later, is nuanced: no, digital connection does not replace physical gathering. But it can do something that physical events cannot — sustain and deepen relationships across geographic boundaries on a daily basis.",
      "The BIF Connect platform now hosts over 10,000 active members across six continents. The membership spans professionals in finance, technology, energy, healthcare, education, law, creative industries, and public policy. They range from early-career professionals seeking mentorship to C-suite executives and government officials. The common thread is not industry or seniority but identity and intent: these are people of African heritage who have chosen to invest in their community's collective advancement.",
      "The platform's architecture reflects BIF's understanding that meaningful professional networking is not about collecting contacts — it is about creating contexts for substantive engagement. Members can join topic-based discussion groups, participate in structured mentorship pairings, access a searchable directory of members by expertise and geography, and attend virtual events including webinars, workshops, and networking sessions.",
      "The most consistently valued feature, according to member surveys, is the mentorship programme. Unlike algorithmic matching systems, BIF's mentorship pairings are facilitated by human coordinators who consider not only professional alignment but cultural context, geographic proximity, and personal compatibility. The result is mentorship relationships with a completion rate of 78% — significantly higher than industry benchmarks for digital mentorship platforms.",
      "The platform has also catalysed tangible economic activity. Over 340 business partnerships have originated through BIF Connect, with members reporting that the trust inherent in a community-vetted network significantly accelerates the process of identifying and evaluating potential collaborators. A logistics company in Kenya found its European distribution partner through the platform. A legal practice in London sourced specialist counsel in Nigeria for a cross-border transaction. A fashion brand in Paris connected with textile suppliers in Ghana.",
      "These connections illustrate a dynamic that BIF's leadership has long articulated: the global Black community possesses enormous economic potential that is systematically under-leveraged because the infrastructure for intra-community commerce has historically been weak. Colonial-era trade patterns, which oriented African economies toward European markets rather than toward each other, created disconnections that persist today. Digital platforms like BIF Connect cannot undo centuries of structural fragmentation overnight, but they can begin to rebuild the commercial and professional networks that fragmentation disrupted.",
      "The platform's growth has not been without challenges. Ensuring equitable access across regions with varying levels of internet connectivity remains an ongoing concern. The moderation demands of a global, multilingual community are significant. And translating online relationships into offline impact requires continuous cultivation — a digital introduction is a beginning, not an outcome.",
      "Looking ahead, BIF plans to integrate the platform more deeply with its other programmes, including the entrepreneurship accelerator, the scholarship programme, and the community investment circles. The vision is a single ecosystem in which education, mentorship, networking, investment, and advocacy reinforce each other — a digital infrastructure for collective empowerment that operates across borders and time zones, available to anyone in the global Black community who chooses to participate."
    ]
  }
];

// ─── MEMBERSHIP TIERS (6 tiers) ───
const MEMBERSHIP_TIERS = [
  {
    name: "Community", price: "Free", period: "", color: "#6B7280", icon: <Icons.Users />,
    description: "Join the global conversation and connect with our community.",
    features: [
      "Access to public news & articles",
      "Community forum participation",
      "Monthly BIF newsletter",
      "Event announcements & calendar",
      "Basic member profile",
      "Pillar signup (one pillar)"
    ]
  },
  {
    name: "Bronze", price: "€9.99", period: "/month", color: "#CD7F32", icon: <Icons.Star />,
    description: "For individuals ready to deepen their engagement and impact.",
    features: [
      "Everything in Community, plus:",
      "Full Insights library access",
      "Member-only discussion groups",
      "Quarterly virtual networking events",
      "Early event registration",
      "Digital membership badge",
      "Pillar signup (up to two pillars)"
    ]
  },
  {
    name: "Silver", price: "€24.99", period: "/month", color: "#C0C0C0", icon: <Icons.Award />,
    popular: true,
    description: "For professionals and changemakers committed to community leadership.",
    features: [
      "Everything in Bronze, plus:",
      "Mentorship programme access",
      "BIF webinar & workshop library",
      "GBIS livestream access",
      "Priority speaker opportunities",
      "Professional networking directory",
      "Exclusive research & reports",
      "Pillar signup (up to three pillars)",
      "Regional selection panel eligibility"
    ]
  },
  {
    name: "Gold", price: "€49.99", period: "/month", color: "#D4A843", icon: <Icons.Crown />,
    description: "For leaders and organisations driving transformative global impact.",
    features: [
      "Everything in Silver, plus:",
      "VIP access to all BIF events",
      "Private roundtable invitations",
      "1-on-1 mentorship matching",
      "Spotlight in BIF newsletter",
      "Investment circle participation",
      "Direct access to BIF leadership",
      "GBIS Gala Dinner invitation",
      "All four pillar access"
    ]
  },
  {
    name: "Platinum", price: "€99.99", period: "/month", color: "#E5E4E2", icon: <Icons.Diamond />,
    description: "For high-impact individuals and patrons shaping the future of the community.",
    features: [
      "Everything in Gold, plus:",
      "GBIS VIP lounge & priority seating",
      "Annual 1-on-1 strategy session with BIF Board member",
      "Invitation to private investor roundtables",
      "Co-branded thought leadership opportunities",
      "Early access to BIF research publications",
      "Dedicated relationship manager",
      "Name recognition in BIF Annual Report",
      "Priority application review for all BIF programmes",
      "Bring +1 guest to all BIF events"
    ]
  },
  {
    name: "Enterprise", price: "Custom", period: "", color: "#2C3E50", icon: <Icons.Building />,
    enterprise: true,
    description: "For organisations and corporations committed to systemic impact at scale.",
    features: [
      "Everything in Platinum, plus:",
      "Organisation-wide membership (up to 50 seats)",
      "Branded partnership at GBIS & BIF events",
      "Custom CSR programme co-design with BIF",
      "Employee volunteer & mentorship programme integration",
      "Quarterly impact reports & analytics dashboard",
      "Prominent placement on BIF website & materials",
      "Speaking slots at BIF flagship events",
      "Access to BIF's corporate advisory network",
      "Dedicated account team",
      "Custom programme development"
    ]
  }
];

// ─── PILLARS DATA ───
const PILLARS = [
  {
    id: "entrepreneurship", title: "Entrepreneurship", icon: <Icons.Sparkle />,
    color: "#D4A843", gradient: "linear-gradient(135deg, #D4A843, #8B6914)",
    description: "Supporting Black entrepreneurs globally with mentorship, funding pathways, investment circles, and connections.",
    longDesc: "The Entrepreneurship Pillar is BIF's engine for economic empowerment. Through structured mentorship programmes, seed funding access, the Community Investment Circles, and showcase opportunities at GBIS, we provide the infrastructure that turns entrepreneurial talent into thriving businesses. Members of this pillar gain access to business development workshops, investor matching, peer support networks, and the annual Dragon's Den pitch competition.",
    benefits: [
      "Structured mentorship with established entrepreneurs",
      "Access to BIF's Community Investment Circles",
      "Business development workshops & masterclasses",
      "Investor matching & pitch preparation support",
      "Dragon's Den pitch competition eligibility",
      "Cross-border business networking",
      "Market entry support for new geographies"
    ]
  },
  {
    id: "education", title: "Education", icon: <Icons.Book />,
    color: "#11998e", gradient: "linear-gradient(135deg, #11998e, #0D6E5C)",
    description: "Investing in scholarships, research programmes, and knowledge exchange across the diaspora.",
    longDesc: "The Education Pillar invests in the intellectual capital of the global Black community. From undergraduate scholarships to postgraduate research funding, from digital literacy initiatives to vocational training partnerships, we build pathways to knowledge and credentials that open doors. Pillar members receive priority access to scholarship information, mentoring from academic professionals, and invitations to BIF's education-focused events and conferences.",
    benefits: [
      "Priority notification of BIF scholarship opportunities",
      "Academic mentorship matching",
      "Access to BIF's education webinar series",
      "Study abroad support & guidance",
      "Connections with educational institutions worldwide",
      "Digital literacy resources & training",
      "Career transition support & guidance"
    ]
  },
  {
    id: "research", title: "Research & Advocacy", icon: <Icons.Globe />,
    color: "#1B4D6E", gradient: "linear-gradient(135deg, #1B4D6E, #0D2E44)",
    description: "Driving policy change and producing evidence-based research to address systemic inequities.",
    longDesc: "The Research & Advocacy Pillar produces the evidence base that underpins BIF's mission. Through commissioned research, policy papers, data collection, and strategic advocacy at forums like the World Economic Forum and African Energy Week, we ensure that the interests of the global Black community are represented in the decisions that shape our collective future. Pillar members contribute to research initiatives, access exclusive publications, and participate in policy working groups.",
    benefits: [
      "Access to BIF research publications & reports",
      "Invitation to policy working groups",
      "Opportunities to contribute to BIF research",
      "Advocacy training & capacity building",
      "Representation at international policy forums",
      "Data & insights for community organisations",
      "Connection with academic researchers globally"
    ]
  },
  {
    id: "legal", title: "Legal Support", icon: <Icons.Shield />,
    color: "#6E1B4D", gradient: "linear-gradient(135deg, #6E1B4D, #440D2E)",
    description: "Providing resources and advocacy to protect the rights of people of African heritage worldwide.",
    longDesc: "The Legal Support Pillar ensures that the rights of people of African heritage are protected, defended, and advanced through strategic legal interventions, resources, and advocacy. From know-your-rights workshops to pro bono legal matching, from immigration guidance to anti-discrimination support, we provide the legal infrastructure that empowers individuals and communities to assert their rights with confidence.",
    benefits: [
      "Know-your-rights workshops & resources",
      "Pro bono legal professional matching",
      "Immigration & visa guidance resources",
      "Anti-discrimination legal support information",
      "Business legal essentials workshops",
      "Intellectual property protection guidance",
      "Access to BIF's legal advisory network"
    ]
  }
];

const BOARD_MEMBERS = [
  { name: "Clarence Seedorf", role: "Chairman & Founder", desc: "Former world-class footballer, philanthropist, and visionary leader driving global unity." },
  { name: "NJ Ayuk", role: "Vice Chairman", desc: "Executive Chairman of the African Energy Chamber and champion of African development." },
  { name: "Rachel Drielinger", role: "Treasurer", desc: "Financial strategist ensuring sustainable governance and growth." },
  { name: "Ivolaine de Nobrega", role: "Board Member", desc: "Dedicated advocate for inclusive community development worldwide." },
  { name: "Wilma Gillis-Burleson", role: "Board Member", desc: "Champion of diversity, equity, and corporate social responsibility." },
  { name: "Vincent Hooplot", role: "Board Member", desc: "Community leader and strategic partnership builder across continents." },
];

// ─── MAIN STYLES ───
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,500&family=Sora:wght@300;400;500;600;700&display=swap');

  :root {
    --gold: #D4A843; --gold-light: #E8C66A; --gold-dark: #8B6914;
    --black: #0A0A0A; --black-light: #131313; --black-mid: #1C1C1C;
    --white: #F5F0E8; --white-pure: #FFFFFF;
    --gray-100: #F7F7F5; --gray-200: #E8E5DE; --gray-300: #C4BFB3;
    --gray-400: #9B9588; --gray-500: #6B6560; --gray-700: #3A3632; --gray-800: #252220;
  }
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family:'Sora',sans-serif; background:var(--white); color:var(--black); overflow-x:hidden; }
  .app { min-height:100vh; }

  /* NAV */
  .nav { position:fixed; top:0; left:0; right:0; z-index:100; padding:0 clamp(1rem,4vw,3rem); height:72px; display:flex; align-items:center; justify-content:space-between; background:rgba(10,10,10,0.96); backdrop-filter:blur(20px); border-bottom:1px solid rgba(212,168,67,0.12); transition:all .4s; }
  .nav.scrolled { height:60px; }
  .nav-logo { font-family:'Cormorant Garamond',serif; font-weight:700; font-size:1.2rem; color:var(--gold); cursor:pointer; display:flex; align-items:center; gap:10px; letter-spacing:0.01em; }
  .nav-logo-icon { width:34px; height:34px; border-radius:50%; background:linear-gradient(135deg,var(--gold),var(--gold-dark)); display:flex; align-items:center; justify-content:center; font-weight:700; font-size:12px; color:var(--black); font-family:'Sora',sans-serif; }
  .nav-links { display:flex; gap:1.5rem; align-items:center; list-style:none; }
  .nav-links a { color:var(--gray-300); text-decoration:none; font-size:0.78rem; font-weight:500; letter-spacing:0.06em; text-transform:uppercase; transition:color .3s; cursor:pointer; }
  .nav-links a:hover, .nav-links a.active { color:var(--gold); }
  .nav-cta { background:var(--gold)!important; color:var(--black)!important; padding:7px 18px!important; border-radius:6px; font-weight:600!important; transition:all .3s!important; }
  .nav-cta:hover { background:var(--gold-light)!important; }
  .nav-mobile-btn { display:none; background:none; border:none; color:var(--gold); cursor:pointer; }

  /* MOBILE */
  .mobile-menu { position:fixed; inset:0; z-index:200; background:rgba(10,10,10,0.98); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:1.75rem; opacity:0; pointer-events:none; transition:opacity .3s; }
  .mobile-menu.open { opacity:1; pointer-events:all; }
  .mobile-menu a { color:var(--white); text-decoration:none; font-family:'Cormorant Garamond',serif; font-size:1.6rem; font-weight:600; cursor:pointer; transition:color .3s; }
  .mobile-menu a:hover { color:var(--gold); }
  .mobile-close { position:absolute; top:22px; right:22px; background:none; border:none; color:var(--gold); cursor:pointer; }

  /* HERO */
  .hero { min-height:100vh; position:relative; display:flex; align-items:center; background:var(--black); overflow:hidden; padding:120px clamp(1.5rem,5vw,4rem) 80px; }
  .hero::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse 80% 60% at 70% 40%, rgba(212,168,67,0.07) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 20% 80%, rgba(27,77,110,0.05) 0%, transparent 60%); }
  .hero-grid { position:absolute; inset:0; background-image:linear-gradient(rgba(212,168,67,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,67,0.025) 1px, transparent 1px); background-size:60px 60px; }
  .hero-content { position:relative; z-index:2; max-width:800px; }
  .hero-badge { display:inline-flex; align-items:center; gap:8px; background:rgba(212,168,67,0.1); border:1px solid rgba(212,168,67,0.2); padding:6px 16px; border-radius:100px; font-size:0.7rem; font-weight:600; letter-spacing:0.1em; text-transform:uppercase; color:var(--gold); margin-bottom:2rem; animation:fadeUp .8s ease; }
  .hero h1 { font-family:'Cormorant Garamond',serif; font-size:clamp(2.5rem,6vw,4.8rem); font-weight:700; line-height:1.08; color:var(--white); margin-bottom:1.5rem; animation:fadeUp .8s ease .1s both; }
  .hero h1 em { color:var(--gold); font-style:italic; }
  .hero p { font-size:clamp(0.95rem,1.4vw,1.1rem); color:var(--gray-300); line-height:1.75; max-width:600px; margin-bottom:2.5rem; animation:fadeUp .8s ease .2s both; }
  .hero-actions { display:flex; gap:1rem; flex-wrap:wrap; animation:fadeUp .8s ease .3s both; }
  .hero-stats { display:flex; gap:3rem; margin-top:3.5rem; animation:fadeUp .8s ease .4s both; }
  .hero-stat h3 { font-family:'Cormorant Garamond',serif; font-size:clamp(1.8rem,3vw,2.5rem); font-weight:700; color:var(--gold); }
  .hero-stat p { font-size:0.75rem; color:var(--gray-400); text-transform:uppercase; letter-spacing:0.08em; margin:0; }
  .hero-orb { position:absolute; right:-5%; top:50%; transform:translateY(-50%); width:500px; height:500px; background:radial-gradient(circle,rgba(212,168,67,0.1)0%,transparent 70%); border-radius:50%; animation:pulse 6s ease-in-out infinite; }

  /* BUTTONS */
  .btn { display:inline-flex; align-items:center; gap:8px; padding:13px 26px; border-radius:8px; font-family:'Sora',sans-serif; font-size:0.82rem; font-weight:600; letter-spacing:0.04em; text-transform:uppercase; text-decoration:none; border:none; cursor:pointer; transition:all .3s; }
  .btn-primary { background:var(--gold); color:var(--black); }
  .btn-primary:hover { background:var(--gold-light); transform:translateY(-2px); box-shadow:0 8px 30px rgba(212,168,67,0.3); }
  .btn-outline { background:transparent; color:var(--white); border:1.5px solid rgba(255,255,255,0.2); }
  .btn-outline:hover { border-color:var(--gold); color:var(--gold); }
  .btn-dark { background:var(--black); color:var(--white); }
  .btn-dark:hover { background:var(--black-light); transform:translateY(-2px); }
  .btn-small { padding:9px 18px; font-size:0.75rem; }
  .btn-back { background:none; border:none; color:var(--gold); font-family:'Sora',sans-serif; font-size:0.82rem; font-weight:600; cursor:pointer; display:inline-flex; align-items:center; gap:6px; padding:0; margin-bottom:2rem; transition:gap .3s; }
  .btn-back:hover { gap:10px; }

  /* SECTIONS */
  .section { padding:clamp(4rem,8vw,7rem) clamp(1.5rem,5vw,4rem); }
  .section-dark { background:var(--black); color:var(--white); }
  .section-alt { background:var(--gray-100); }
  .section-header { max-width:700px; margin-bottom:3rem; }
  .section-header.center { text-align:center; margin-left:auto; margin-right:auto; }
  .section-label { font-size:0.72rem; font-weight:700; letter-spacing:0.15em; text-transform:uppercase; color:var(--gold); margin-bottom:0.75rem; display:flex; align-items:center; gap:8px; }
  .section-label::before { content:''; width:24px; height:2px; background:var(--gold); }
  .center .section-label { justify-content:center; }
  .center .section-label::after { content:''; width:24px; height:2px; background:var(--gold); }
  .section-header h2 { font-family:'Cormorant Garamond',serif; font-size:clamp(1.8rem,3.5vw,2.8rem); font-weight:700; line-height:1.15; margin-bottom:0.75rem; }
  .section-header p { font-size:0.98rem; color:var(--gray-500); line-height:1.7; }
  .section-dark .section-header p { color:var(--gray-300); }

  /* NEWS */
  .news-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(340px,1fr)); gap:1.25rem; }
  .news-card { background:var(--white-pure); border-radius:12px; overflow:hidden; border:1px solid var(--gray-200); transition:all .4s; cursor:pointer; }
  .news-card:hover { transform:translateY(-4px); box-shadow:0 20px 60px rgba(0,0,0,0.07); border-color:var(--gold); }
  .news-card.featured { grid-column:1/-1; display:grid; grid-template-columns:1.2fr 1fr; }
  .news-card-img { height:200px; display:flex; align-items:flex-end; padding:1.25rem; }
  .news-card.featured .news-card-img { height:100%; min-height:300px; }
  .news-card-cat { background:rgba(0,0,0,0.6); backdrop-filter:blur(10px); color:var(--gold); padding:4px 12px; border-radius:4px; font-size:0.68rem; font-weight:700; letter-spacing:0.1em; position:relative; z-index:2; }
  .news-card-body { padding:1.5rem; }
  .news-card-date { font-size:0.78rem; color:var(--gray-400); margin-bottom:0.6rem; display:flex; align-items:center; gap:6px; }
  .news-card-body h3 { font-family:'Cormorant Garamond',serif; font-size:1.2rem; font-weight:700; line-height:1.3; margin-bottom:0.6rem; color:var(--black); }
  .news-card.featured .news-card-body h3 { font-size:1.4rem; }
  .news-card-body>p { font-size:0.88rem; color:var(--gray-500); line-height:1.6; }
  .card-link { display:inline-flex; align-items:center; gap:6px; margin-top:0.75rem; font-size:0.8rem; font-weight:600; color:var(--gold); text-decoration:none; transition:gap .3s; }
  .card-link:hover { gap:10px; }

  /* INSIGHTS */
  .insights-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(320px,1fr)); gap:1.25rem; }
  .insight-card { background:var(--black-mid); border:1px solid rgba(255,255,255,0.06); border-radius:12px; padding:1.75rem; transition:all .4s; cursor:pointer; position:relative; overflow:hidden; }
  .insight-card::before { content:''; position:absolute; top:0; left:0; width:100%; height:3px; background:linear-gradient(90deg,var(--gold),transparent); opacity:0; transition:opacity .4s; }
  .insight-card:hover { border-color:rgba(212,168,67,0.2); transform:translateY(-3px); }
  .insight-card:hover::before { opacity:1; }
  .insight-meta { display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem; }
  .insight-type { font-size:0.68rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:var(--gold); background:rgba(212,168,67,0.1); padding:4px 10px; border-radius:4px; }
  .insight-read { font-size:0.78rem; color:var(--gray-400); }
  .insight-card h3 { font-family:'Cormorant Garamond',serif; font-size:1.1rem; font-weight:700; color:var(--white); line-height:1.35; margin-bottom:0.6rem; }
  .insight-card>p { font-size:0.85rem; color:var(--gray-400); line-height:1.65; }
  .insight-tag { display:inline-block; margin-top:0.75rem; font-size:0.72rem; font-weight:600; color:var(--gray-300); padding:3px 10px; border:1px solid rgba(255,255,255,0.1); border-radius:100px; }

  /* MEMBERSHIP */
  .tiers-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:1.25rem; max-width:1400px; margin:0 auto; }
  .tier-card { background:var(--white-pure); border:1.5px solid var(--gray-200); border-radius:16px; padding:2rem; position:relative; transition:all .4s; display:flex; flex-direction:column; }
  .tier-card:hover { transform:translateY(-4px); box-shadow:0 20px 60px rgba(0,0,0,0.07); }
  .tier-card.popular { border-color:var(--gold); box-shadow:0 8px 40px rgba(212,168,67,0.12); }
  .tier-badge { position:absolute; top:-12px; left:50%; transform:translateX(-50%); background:var(--gold); color:var(--black); padding:4px 16px; border-radius:100px; font-size:0.68rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; }
  .tier-icon { margin-bottom:0.75rem; color:var(--gold); }
  .tier-name { font-size:0.78rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; margin-bottom:0.25rem; }
  .tier-price { font-family:'Cormorant Garamond',serif; font-size:2.2rem; font-weight:700; margin-bottom:0.25rem; }
  .tier-price span { font-size:0.9rem; font-weight:400; color:var(--gray-400); }
  .tier-desc { font-size:0.85rem; color:var(--gray-500); line-height:1.55; margin-bottom:1.25rem; padding-bottom:1.25rem; border-bottom:1px solid var(--gray-200); }
  .tier-features { list-style:none; margin-bottom:1.5rem; flex:1; }
  .tier-features li { display:flex; align-items:flex-start; gap:8px; font-size:0.83rem; color:var(--gray-700); padding:4px 0; }
  .tier-features li svg { flex-shrink:0; margin-top:2px; color:var(--gold); }
  .tier-btn { width:100%; text-align:center; justify-content:center; padding:11px; border-radius:8px; font-weight:600; font-size:0.82rem; cursor:pointer; transition:all .3s; border:none; font-family:'Sora',sans-serif; letter-spacing:0.03em; }

  /* PILLAR CARDS */
  .pillar-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:1.25rem; }
  .pillar-card { border-radius:14px; padding:2rem; position:relative; overflow:hidden; transition:all .4s; cursor:pointer; border:2px solid transparent; }
  .pillar-card:hover { transform:translateY(-3px); border-color:rgba(255,255,255,0.2); }
  .pillar-card-icon { width:48px; height:48px; border-radius:12px; background:rgba(255,255,255,0.15); display:flex; align-items:center; justify-content:center; color:white; margin-bottom:1rem; }
  .pillar-card h3 { font-family:'Cormorant Garamond',serif; font-size:1.25rem; font-weight:700; color:white; margin-bottom:0.5rem; }
  .pillar-card>p { font-size:0.88rem; color:rgba(255,255,255,0.75); line-height:1.6; }

  /* PILLAR DETAIL */
  .pillar-detail { background:var(--white-pure); border:1px solid var(--gray-200); border-radius:16px; padding:2.5rem; max-width:800px; margin:0 auto; }
  .pillar-detail h2 { font-family:'Cormorant Garamond',serif; font-size:1.6rem; font-weight:700; margin-bottom:0.75rem; }
  .pillar-detail>p { font-size:0.95rem; color:var(--gray-700); line-height:1.75; margin-bottom:1.5rem; }
  .pillar-benefits { list-style:none; margin-bottom:2rem; }
  .pillar-benefits li { display:flex; align-items:flex-start; gap:10px; font-size:0.9rem; color:var(--gray-700); padding:6px 0; }
  .pillar-benefits li svg { flex-shrink:0; margin-top:2px; color:var(--gold); }
  .pillar-form { background:var(--gray-100); border-radius:12px; padding:1.75rem; }
  .pillar-form h3 { font-family:'Cormorant Garamond',serif; font-size:1.15rem; font-weight:700; margin-bottom:1rem; }

  /* ARTICLE VIEW */
  .article-container { max-width:780px; margin:0 auto; padding:6.5rem clamp(1.5rem,5vw,3rem) 4rem; }
  .article-meta { display:flex; align-items:center; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap; }
  .article-meta span { font-size:0.75rem; font-weight:600; letter-spacing:0.08em; text-transform:uppercase; }
  .article-container h1 { font-family:'Cormorant Garamond',serif; font-size:clamp(1.8rem,3.5vw,2.6rem); font-weight:700; line-height:1.15; margin-bottom:1.5rem; }
  .article-body p { font-size:1rem; color:var(--gray-700); line-height:1.85; margin-bottom:1.25rem; }
  .article-body p:first-child { font-size:1.08rem; color:var(--gray-800); }

  /* AUTH MODAL */
  .modal-overlay { position:fixed; inset:0; z-index:300; background:rgba(0,0,0,0.7); backdrop-filter:blur(8px); display:flex; align-items:center; justify-content:center; padding:1rem; opacity:0; pointer-events:none; transition:opacity .3s; }
  .modal-overlay.open { opacity:1; pointer-events:all; }
  .modal { background:var(--white-pure); border-radius:20px; width:100%; max-width:480px; padding:2.5rem; position:relative; transform:translateY(20px); transition:transform .3s; max-height:90vh; overflow-y:auto; }
  .modal-overlay.open .modal { transform:translateY(0); }
  .modal-close { position:absolute; top:16px; right:16px; background:var(--gray-100); border:none; width:34px; height:34px; border-radius:50%; display:flex; align-items:center; justify-content:center; cursor:pointer; }
  .modal h2 { font-family:'Cormorant Garamond',serif; font-size:1.5rem; font-weight:700; margin-bottom:0.5rem; }
  .modal>p { font-size:0.88rem; color:var(--gray-500); margin-bottom:1.25rem; }
  .form-group { margin-bottom:0.85rem; }
  .form-label { display:block; font-size:0.75rem; font-weight:600; color:var(--gray-700); margin-bottom:5px; letter-spacing:0.03em; }
  .form-input, .form-select { width:100%; padding:11px 13px; border:1.5px solid var(--gray-200); border-radius:8px; font-size:0.9rem; font-family:'Sora',sans-serif; background:var(--gray-100); transition:all .3s; outline:none; }
  .form-input:focus, .form-select:focus { border-color:var(--gold); background:var(--white-pure); }
  .form-select { appearance:none; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236B6560' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 13px center; cursor:pointer; }
  .form-submit { width:100%; padding:12px; background:var(--gold); color:var(--black); border:none; border-radius:8px; font-family:'Sora',sans-serif; font-size:0.9rem; font-weight:700; cursor:pointer; transition:all .3s; margin-top:0.5rem; }
  .form-submit:hover { background:var(--gold-light); }
  .form-toggle { text-align:center; margin-top:1.25rem; font-size:0.85rem; color:var(--gray-500); }
  .form-toggle a { color:var(--gold); font-weight:600; cursor:pointer; text-decoration:none; }
  .form-checkbox { display:flex; align-items:flex-start; gap:8px; padding:4px 0; }
  .form-checkbox input { margin-top:3px; accent-color:var(--gold); }
  .form-checkbox label { font-size:0.82rem; color:var(--gray-700); }

  /* BOARD */
  .board-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(220px,1fr)); gap:1.25rem; }
  .board-card { background:var(--white-pure); border:1px solid var(--gray-200); border-radius:12px; padding:1.5rem; text-align:center; transition:all .4s; }
  .board-card:hover { transform:translateY(-3px); box-shadow:0 12px 40px rgba(0,0,0,0.06); border-color:var(--gold); }
  .board-avatar { width:56px; height:56px; border-radius:50%; background:linear-gradient(135deg,var(--gold),var(--gold-dark)); display:flex; align-items:center; justify-content:center; margin:0 auto .75rem; font-family:'Cormorant Garamond',serif; font-weight:700; font-size:1.1rem; color:var(--black); }
  .board-card h4 { font-family:'Cormorant Garamond',serif; font-weight:700; font-size:1rem; margin-bottom:0.2rem; }
  .board-role { font-size:0.75rem; font-weight:600; color:var(--gold); margin-bottom:0.4rem; }
  .board-card>p { font-size:0.82rem; color:var(--gray-500); line-height:1.5; }

  /* COMMUNITY FEATURES */
  .community-features { display:grid; grid-template-columns:repeat(auto-fit,minmax(300px,1fr)); gap:1.25rem; }
  .community-card { padding:2.25rem; border-radius:14px; position:relative; overflow:hidden; transition:transform .4s; }
  .community-card:hover { transform:translateY(-3px); }
  .community-card:nth-child(1){background:linear-gradient(145deg,#1B4D6E,#0D2E44)} .community-card:nth-child(2){background:linear-gradient(145deg,#4D1B6E,#2D1044)} .community-card:nth-child(3){background:linear-gradient(145deg,#1B6E4D,#0D4430)} .community-card:nth-child(4){background:linear-gradient(145deg,#6E4D1B,#44300D)}
  .community-card h3 { font-family:'Cormorant Garamond',serif; font-size:1.2rem; font-weight:700; color:white; margin-bottom:0.5rem; }
  .community-card>p { font-size:0.88rem; color:rgba(255,255,255,0.7); line-height:1.6; }

  /* DASHBOARD */
  .dash-welcome { background:linear-gradient(135deg,var(--black),var(--black-mid)); padding:6rem clamp(1.5rem,5vw,4rem) 3rem; border-bottom:1px solid rgba(212,168,67,0.15); }
  .dash-welcome h1 { font-family:'Cormorant Garamond',serif; font-size:clamp(1.8rem,3vw,2.5rem); color:var(--white); font-weight:700; }
  .dash-welcome>p { color:var(--gray-300); margin-top:0.4rem; }
  .dash-badge { display:inline-flex; align-items:center; gap:6px; padding:4px 14px; border-radius:100px; font-size:0.72rem; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; margin-top:0.75rem; }
  .quick-links { display:grid; grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); gap:0.75rem; margin-top:1.75rem; }
  .quick-link { background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:10px; padding:1rem; color:var(--white); cursor:pointer; display:flex; align-items:center; gap:10px; transition:all .3s; }
  .quick-link:hover { border-color:rgba(212,168,67,0.3); background:rgba(212,168,67,0.05); }
  .quick-link span { font-weight:600; font-size:0.85rem; }

  /* FOOTER */
  .footer { background:var(--black); border-top:1px solid rgba(212,168,67,0.1); padding:3.5rem clamp(1.5rem,5vw,4rem) 1.5rem; }
  .footer-grid { display:grid; grid-template-columns:2fr repeat(3,1fr); gap:2.5rem; margin-bottom:2.5rem; }
  .footer-brand p { font-size:0.85rem; color:var(--gray-400); line-height:1.7; margin-top:0.75rem; max-width:300px; }
  .footer h4 { font-size:0.7rem; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; color:var(--gold); margin-bottom:1rem; }
  .footer-links { list-style:none; }
  .footer-links li { margin-bottom:0.6rem; }
  .footer-links a { color:var(--gray-400); text-decoration:none; font-size:0.85rem; transition:color .3s; cursor:pointer; }
  .footer-links a:hover { color:var(--gold); }
  .footer-bottom { border-top:1px solid rgba(255,255,255,0.06); padding-top:1.5rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.75rem; }
  .footer-bottom p { font-size:0.78rem; color:var(--gray-500); }
  .footer-bottom a { color:var(--gold); text-decoration:none; }

  /* CTA BANNER */
  .cta-banner { background:linear-gradient(135deg,var(--gold-dark),var(--gold)); padding:3.5rem clamp(1.5rem,5vw,4rem); text-align:center; }
  .cta-banner h2 { font-family:'Cormorant Garamond',serif; font-size:clamp(1.5rem,3vw,2.2rem); font-weight:700; color:var(--black); margin-bottom:0.75rem; }
  .cta-banner p { font-size:1rem; color:rgba(0,0,0,0.7); max-width:550px; margin:0 auto 1.75rem; line-height:1.6; }

  /* SUCCESS MESSAGE */
  .success-msg { background:rgba(17,153,142,0.1); border:1px solid rgba(17,153,142,0.3); border-radius:10px; padding:1.25rem; text-align:center; margin-top:1rem; }
  .success-msg p { color:#0D6E5C; font-weight:600; font-size:0.9rem; }

  @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes pulse { 0%,100%{transform:translateY(-50%) scale(1);opacity:.5} 50%{transform:translateY(-50%) scale(1.05);opacity:.7} }

  @media(max-width:900px){ .nav-links{display:none} .nav-mobile-btn{display:block} .news-card.featured{grid-template-columns:1fr} .hero-orb{display:none} .footer-grid{grid-template-columns:1fr 1fr} .hero-stats{gap:1.5rem} }
  @media(max-width:600px){ .footer-grid{grid-template-columns:1fr} .hero-stats{flex-direction:column;gap:1rem} .tiers-grid,.news-grid,.insights-grid{grid-template-columns:1fr} }
`;

// ─── MAIN APP ───
export default function BIFCommunity() {
  const [page, setPage] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [authModal, setAuthModal] = useState(null);
  const [user, setUser] = useState(null);
  const [authForm, setAuthForm] = useState({ name:"", email:"", password:"", tier:"Community", country:"" });
  const [viewArticle, setViewArticle] = useState(null);
  const [viewInsight, setViewInsight] = useState(null);
  const [viewPillar, setViewPillar] = useState(null);
  const [pillarForm, setPillarForm] = useState({ name:"", email:"", motivation:"" });
  const [pillarSuccess, setPillarSuccess] = useState(false);
  const [selectedPillars, setSelectedPillars] = useState([]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigate = (p) => {
    setPage(p); setMobileMenu(false); setViewArticle(null); setViewInsight(null); setViewPillar(null); setPillarSuccess(false);
    window.scrollTo({top:0,behavior:"smooth"});
  };

  const handleAuth = (e) => {
    e.preventDefault();
    if (authModal === "register") {
      setUser({ name:authForm.name, email:authForm.email, tier:authForm.tier.split("—")[0].trim(), country:authForm.country, pillars:selectedPillars });
    } else {
      setUser({ name:authForm.email.split("@")[0], email:authForm.email, tier:"Silver", country:"Global", pillars:[] });
    }
    setAuthModal(null); setPage("dashboard");
  };

  const handlePillarSignup = (e) => {
    e.preventDefault(); setPillarSuccess(true);
    if (user) {
      setUser({...user, pillars:[...new Set([...(user.pillars||[]), viewPillar.id])]});
    }
  };

  const openArticle = (item) => { setViewArticle(item); window.scrollTo({top:0,behavior:"smooth"}); };
  const openInsight = (item) => { setViewInsight(item); window.scrollTo({top:0,behavior:"smooth"}); };
  const openPillar = (pillar) => { setViewPillar(pillar); setPillarSuccess(false); setPillarForm({name:user?.name||"", email:user?.email||"", motivation:""}); window.scrollTo({top:0,behavior:"smooth"}); };

  const tierColor = (t) => {
    const n = (t||"").toLowerCase();
    if(n.includes("plat")) return {bg:"rgba(229,228,226,0.15)",c:"#E5E4E2",bc:"rgba(229,228,226,0.3)"};
    if(n.includes("gold")) return {bg:"rgba(212,168,67,0.15)",c:"#D4A843",bc:"rgba(212,168,67,0.3)"};
    if(n.includes("silver")) return {bg:"rgba(192,192,192,0.15)",c:"#C0C0C0",bc:"rgba(192,192,192,0.3)"};
    if(n.includes("bronze")) return {bg:"rgba(205,127,50,0.15)",c:"#CD7F32",bc:"rgba(205,127,50,0.3)"};
    if(n.includes("enter")) return {bg:"rgba(44,62,80,0.15)",c:"#5B8BA0",bc:"rgba(44,62,80,0.3)"};
    return {bg:"rgba(107,114,128,0.15)",c:"#9B9588",bc:"rgba(107,114,128,0.3)"};
  };

  // ─── ARTICLE VIEW ───
  if (viewArticle) return (
    <div className="app"><style>{STYLES}</style>
      <nav className="nav scrolled"><div className="nav-logo" onClick={()=>navigate("home")}><div className="nav-logo-icon">BIF</div>Black Impact Foundation</div></nav>
      <div className="article-container">
        <button className="btn-back" onClick={()=>setViewArticle(null)}><Icons.Back /> Back to News</button>
        <div className="article-meta">
          <span style={{color:"var(--gold)"}}>{viewArticle.category}</span>
          <span style={{color:"var(--gray-400)"}}>{viewArticle.date}</span>
        </div>
        <h1>{viewArticle.title}</h1>
        <div className="article-body">
          {viewArticle.body.map((p,i) => <p key={i}>{p}</p>)}
        </div>
        <div style={{marginTop:"3rem",paddingTop:"2rem",borderTop:"1px solid var(--gray-200)"}}>
          <button className="btn btn-primary" onClick={()=>setViewArticle(null)}>Back to All News <Icons.Arrow /></button>
        </div>
      </div>
    </div>
  );

  // ─── INSIGHT VIEW ───
  if (viewInsight) return (
    <div className="app"><style>{STYLES}</style>
      <nav className="nav scrolled"><div className="nav-logo" onClick={()=>navigate("home")}><div className="nav-logo-icon">BIF</div>Black Impact Foundation</div></nav>
      <div className="article-container">
        <button className="btn-back" onClick={()=>setViewInsight(null)}><Icons.Back /> Back to Insights</button>
        <div className="article-meta">
          <span style={{color:"var(--gold)"}}>{viewInsight.type}</span>
          <span style={{color:"var(--gray-400)"}}>{viewInsight.readTime} read</span>
          <span style={{background:"rgba(212,168,67,0.1)",color:"var(--gold-dark)",padding:"3px 10px",borderRadius:100,fontSize:"0.72rem"}}>{viewInsight.tag}</span>
        </div>
        <h1>{viewInsight.title}</h1>
        <div className="article-body">
          {viewInsight.body.map((p,i) => <p key={i}>{p}</p>)}
        </div>
        <div style={{marginTop:"3rem",paddingTop:"2rem",borderTop:"1px solid var(--gray-200)"}}>
          <button className="btn btn-primary" onClick={()=>setViewInsight(null)}>Back to All Insights <Icons.Arrow /></button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="app">
      <style>{STYLES}</style>

      {/* NAV */}
      <nav className={`nav ${scrolled?"scrolled":""}`}>
        <div className="nav-logo" onClick={()=>navigate("home")}><div className="nav-logo-icon">BIF</div>Black Impact Foundation</div>
        <ul className="nav-links">
          {["home","about","news","insights","pillars","community","membership"].map(p=>(
            <li key={p}><a className={page===p?"active":""} onClick={()=>navigate(p)}>{p==="pillars"?"Pillars":p.charAt(0).toUpperCase()+p.slice(1)}</a></li>
          ))}
          {user ? (<>
            <li><a className={page==="dashboard"?"active":""} onClick={()=>navigate("dashboard")}>My Hub</a></li>
            <li><a onClick={()=>{setUser(null);navigate("home")}} style={{color:"var(--gray-400)"}}>Sign Out</a></li>
          </>) : (
            <li><a className="nav-cta" onClick={()=>setAuthModal("login")}>Sign In</a></li>
          )}
        </ul>
        <button className="nav-mobile-btn" onClick={()=>setMobileMenu(true)}><Icons.Menu /></button>
      </nav>

      {/* MOBILE */}
      <div className={`mobile-menu ${mobileMenu?"open":""}`}>
        <button className="mobile-close" onClick={()=>setMobileMenu(false)}><Icons.Close /></button>
        {["home","about","news","insights","pillars","community","membership"].map(p=>(
          <a key={p} onClick={()=>navigate(p)}>{p==="pillars"?"Pillars":p.charAt(0).toUpperCase()+p.slice(1)}</a>
        ))}
        {user ? (<><a onClick={()=>navigate("dashboard")}>My Hub</a><a onClick={()=>{setUser(null);navigate("home")}} style={{color:"var(--gray-400)"}}>Sign Out</a></>) :
        (<a onClick={()=>{setMobileMenu(false);setAuthModal("login")}} style={{color:"var(--gold)"}}>Sign In</a>)}
      </div>

      {/* AUTH MODAL */}
      <div className={`modal-overlay ${authModal?"open":""}`} onClick={e=>e.target===e.currentTarget&&setAuthModal(null)}>
        <div className="modal">
          <button className="modal-close" onClick={()=>setAuthModal(null)}><Icons.Close /></button>
          <h2>{authModal==="login"?"Welcome Back":"Join the Movement"}</h2>
          <p>{authModal==="login"?"Sign in to your BIF Community account.":"Create your account and select your membership tier."}</p>
          <form onSubmit={handleAuth}>
            {authModal==="register"&&<div className="form-group"><label className="form-label">Full Name</label><input className="form-input" required placeholder="Your full name" value={authForm.name} onChange={e=>setAuthForm({...authForm,name:e.target.value})}/></div>}
            <div className="form-group"><label className="form-label">Email Address</label><input className="form-input" type="email" required placeholder="you@example.com" value={authForm.email} onChange={e=>setAuthForm({...authForm,email:e.target.value})}/></div>
            <div className="form-group"><label className="form-label">Password</label><input className="form-input" type="password" required placeholder="••••••••" value={authForm.password} onChange={e=>setAuthForm({...authForm,password:e.target.value})}/></div>
            {authModal==="register"&&<>
              <div className="form-group"><label className="form-label">Country / Region</label>
                <select className="form-select" value={authForm.country} onChange={e=>setAuthForm({...authForm,country:e.target.value})}>
                  <option value="">Select your country</option>
                  {["Netherlands","United Kingdom","United States","Nigeria","South Africa","Ghana","Kenya","Brazil","France","Germany","UAE","Jamaica","Barbados","Bermuda","Canada","Suriname","Democratic Republic of Congo","Senegal","Côte d'Ivoire","Rwanda","Other"].map(c=><option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group"><label className="form-label">Membership Tier</label>
                <select className="form-select" value={authForm.tier} onChange={e=>setAuthForm({...authForm,tier:e.target.value})}>
                  <option>Community</option><option>Bronze — €9.99/mo</option><option>Silver — €24.99/mo</option>
                  <option>Gold — €49.99/mo</option><option>Platinum — €99.99/mo</option><option>Enterprise — Custom Pricing</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Select Your Pillar(s)</label>
                {PILLARS.map(pl=>(
                  <div className="form-checkbox" key={pl.id}>
                    <input type="checkbox" id={`pl-${pl.id}`} checked={selectedPillars.includes(pl.id)} onChange={e=>{
                      setSelectedPillars(prev=>e.target.checked?[...prev,pl.id]:prev.filter(x=>x!==pl.id));
                    }}/>
                    <label htmlFor={`pl-${pl.id}`}>{pl.title}</label>
                  </div>
                ))}
              </div>
            </>}
            <button className="form-submit" type="submit">{authModal==="login"?"Sign In":"Create Account"}</button>
          </form>
          <div className="form-toggle">
            {authModal==="login"?<>Don't have an account? <a onClick={()=>setAuthModal("register")}>Join now</a></>:
            <>Already a member? <a onClick={()=>setAuthModal("login")}>Sign in</a></>}
          </div>
        </div>
      </div>

      {/* ═══════════ HOME ═══════════ */}
      {page==="home"&&<>
        <section className="hero">
          <div className="hero-grid"/><div className="hero-orb"/>
          <div className="hero-content">
            <div className="hero-badge"><Icons.Sparkle /> Uniting the Global Black Community</div>
            <h1>Black Excellence:<br/><em>The Untapped Potential</em> to Unite Our Global Community</h1>
            <p>The Black Impact Foundation builds, develops, sustains and protects an inclusive society where no one is left behind — empowering people of African heritage worldwide through entrepreneurship, education, research and connection.</p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={()=>setAuthModal("register")}>Become a Member <Icons.Arrow /></button>
              <button className="btn btn-outline" onClick={()=>navigate("pillars")}>Explore Our Pillars <Icons.Arrow /></button>
            </div>
            <div className="hero-stats">
              <div className="hero-stat"><h3>40+</h3><p>Countries</p></div>
              <div className="hero-stat"><h3>10K+</h3><p>Members</p></div>
              <div className="hero-stat"><h3>4</h3><p>Pillars of Impact</p></div>
              <div className="hero-stat"><h3>3</h3><p>Global Summits</p></div>
            </div>
          </div>
        </section>

        <section className="section section-dark">
          <div className="section-header"><div className="section-label">Our Pillars</div><h2>Four Pillars of Empowerment</h2><p>Sign up for the pillars that align with your expertise and passion. Each pillar offers unique programmes, resources, and community.</p></div>
          <div className="pillar-grid">
            {PILLARS.map(p=>(
              <div className="pillar-card" key={p.id} style={{background:p.gradient}} onClick={()=>{setPage("pillars");openPillar(p);}}>
                <div className="pillar-card-icon">{p.icon}</div>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <span className="card-link" style={{color:"rgba(255,255,255,0.85)",marginTop:"0.75rem"}}>Join This Pillar <Icons.Arrow /></span>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-header"><div className="section-label">Latest News</div><h2>Stay Informed, Stay Connected</h2></div>
          <div className="news-grid">
            {NEWS_ITEMS.slice(0,3).map(item=>(
              <div key={item.id} className={`news-card ${item.featured?"featured":""}`} onClick={()=>{navigate("news");setTimeout(()=>openArticle(item),100);}}>
                <div className="news-card-img" style={{background:item.image}}><span className="news-card-cat">{item.category}</span></div>
                <div className="news-card-body"><div className="news-card-date"><Icons.Calendar />{item.date}</div><h3>{item.title}</h3><p>{item.excerpt}</p><span className="card-link">Read Full Article <Icons.Arrow /></span></div>
              </div>
            ))}
          </div>
          <div style={{textAlign:"center",marginTop:"2rem"}}><button className="btn btn-dark" onClick={()=>navigate("news")}>View All News <Icons.Arrow /></button></div>
        </section>

        <section className="section section-dark">
          <div className="section-header"><div className="section-label">Insights</div><h2>Stories, History & Case Studies</h2><p>Compelling narratives celebrating African heritage, challenging perceptions, and inspiring the next generation.</p></div>
          <div className="insights-grid">
            {INSIGHTS.slice(0,4).map(item=>(
              <div key={item.id} className="insight-card" onClick={()=>{navigate("insights");setTimeout(()=>openInsight(item),100);}}>
                <div className="insight-meta"><span className="insight-type">{item.type}</span><span className="insight-read">{item.readTime}</span></div>
                <h3>{item.title}</h3><p>{item.excerpt.substring(0,140)}...</p><span className="insight-tag">{item.tag}</span>
              </div>
            ))}
          </div>
          <div style={{textAlign:"center",marginTop:"2rem"}}><button className="btn btn-primary" onClick={()=>navigate("insights")}>Explore All Insights <Icons.Arrow /></button></div>
        </section>

        <section className="cta-banner"><h2>Ready to Make an Impact?</h2><p>Join thousands of members building a brighter, more connected future for the global Black community.</p><button className="btn btn-dark" onClick={()=>setAuthModal("register")}>Join BIF Today <Icons.Arrow /></button></section>
      </>}

      {/* ═══════════ ABOUT ═══════════ */}
      {page==="about"&&<>
        <section className="hero" style={{minHeight:"55vh"}}><div className="hero-grid"/><div className="hero-content"><div className="hero-badge"><Icons.Heart /> Our Story</div><h1>Building an <em>Inclusive Society</em> Where No One Is Left Behind</h1><p>Founded by Clarence Seedorf, BIF is a global movement empowering people of African heritage through unity, opportunity, and excellence.</p></div></section>
        <section className="section">
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:"1.5rem"}}>
            <div style={{padding:"2rem",background:"var(--gray-100)",borderRadius:12}}>
              <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.2rem",marginBottom:"0.75rem",color:"var(--gold-dark)"}}>Our Vision</h3>
              <p style={{lineHeight:1.75,color:"var(--gray-700)",fontSize:"0.92rem"}}>To create a cohesive global Black community where people across the globe are empowered to take control and improve the quality of their lives, assert their value, and be protected from exploitation — while building capacity for socio-economic independence and social responsibility.</p>
            </div>
            <div style={{padding:"2rem",background:"var(--gray-100)",borderRadius:12}}>
              <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.2rem",marginBottom:"0.75rem",color:"var(--gold-dark)"}}>Our Mission</h3>
              <p style={{lineHeight:1.75,color:"var(--gray-700)",fontSize:"0.92rem"}}>To be a solid pillar and catalyst to empower, build, protect, sustain and further develop an inclusive and equal society through entrepreneurship, education, research and legal support — improving the overall development of character, sense of worth, and a flourishing value system while encouraging social mobility.</p>
            </div>
          </div>
        </section>
        <section className="section section-alt">
          <div className="section-header"><div className="section-label">Leadership</div><h2>Board of Directors</h2></div>
          <div className="board-grid">
            {BOARD_MEMBERS.map((m,i)=>(<div className="board-card" key={i}><div className="board-avatar">{m.name.split(" ").map(n=>n[0]).join("")}</div><h4>{m.name}</h4><div className="board-role">{m.role}</div><p>{m.desc}</p></div>))}
          </div>
        </section>
        <section className="section">
          <div className="section-header center"><div className="section-label">Global Black Impact Summit</div><h2>Our Flagship Event</h2></div>
          <div style={{maxWidth:780,margin:"0 auto",background:"var(--white-pure)",borderRadius:16,padding:"2rem",border:"1px solid var(--gray-200)"}}>
            <div style={{display:"flex",gap:"0.75rem",flexWrap:"wrap",marginBottom:"1.25rem"}}>
              {["Abu Dhabi 2026","Dubai 2024","Cape Town 2023","Amsterdam 2022"].map((e,i)=>(<span key={i} style={{background:"rgba(212,168,67,0.1)",color:"var(--gold-dark)",padding:"4px 12px",borderRadius:100,fontSize:"0.75rem",fontWeight:600}}>{e}</span>))}
            </div>
            <p style={{lineHeight:1.75,color:"var(--gray-700)",fontSize:"0.92rem",marginBottom:"1rem"}}>GBIS is more than a summit — it's a movement. Each year, hundreds of leaders, entrepreneurs, policymakers, and changemakers convene to foster connections, promote equality, and champion the collective talent of Black voices worldwide.</p>
            <p style={{lineHeight:1.75,color:"var(--gray-700)",fontSize:"0.92rem"}}>Featuring keynote speeches, panel discussions spanning finance, sports, fashion, energy and entrepreneurship, the Dragon's Den pitch competition, and the prestigious Black Excellence Awards Gala Dinner.</p>
          </div>
        </section>
        <section className="cta-banner"><h2>Be Part of the Change</h2><p>Your membership directly supports BIF's mission worldwide.</p><button className="btn btn-dark" onClick={()=>navigate("membership")}>View Membership Tiers <Icons.Arrow /></button></section>
      </>}

      {/* ═══════════ NEWS ═══════════ */}
      {page==="news"&&<>
        <section className="hero" style={{minHeight:"42vh"}}><div className="hero-grid"/><div className="hero-content"><div className="hero-badge"><Icons.Globe /> Stay Informed</div><h1>News & <em>Updates</em></h1><p>The latest from BIF — initiatives, partnerships, events, and stories driving change across the global Black community.</p></div></section>
        <section className="section">
          <div className="news-grid">
            {NEWS_ITEMS.map(item=>(<div key={item.id} className={`news-card ${item.featured?"featured":""}`} onClick={()=>openArticle(item)}>
              <div className="news-card-img" style={{background:item.image}}><span className="news-card-cat">{item.category}</span></div>
              <div className="news-card-body"><div className="news-card-date"><Icons.Calendar />{item.date}</div><h3>{item.title}</h3><p>{item.excerpt}</p><span className="card-link">Read Full Article <Icons.Arrow /></span></div>
            </div>))}
          </div>
        </section>
        <section className="cta-banner"><h2>Never Miss an Update</h2><p>Join BIF to receive our newsletter and stay connected.</p><button className="btn btn-dark" onClick={()=>setAuthModal("register")}>Join the Community <Icons.Arrow /></button></section>
      </>}

      {/* ═══════════ INSIGHTS ═══════════ */}
      {page==="insights"&&<>
        <section className="hero" style={{minHeight:"42vh"}}><div className="hero-grid"/><div className="hero-content"><div className="hero-badge"><Icons.Book /> Knowledge & Heritage</div><h1>Insights: Stories, <em>History</em> & Case Studies</h1><p>Compelling narratives celebrating African heritage, showcasing community impact, and rewriting the story of people of African descent.</p></div></section>
        <section className="section section-dark">
          <div className="insights-grid">
            {INSIGHTS.map(item=>(<div key={item.id} className="insight-card" onClick={()=>openInsight(item)}>
              <div className="insight-meta"><span className="insight-type">{item.type}</span><span className="insight-read">{item.readTime}</span></div>
              <h3>{item.title}</h3><p>{item.excerpt.substring(0,160)}...</p><span className="insight-tag">{item.tag}</span>
            </div>))}
          </div>
        </section>
        <section className="cta-banner"><h2>Have a Story to Share?</h2><p>BIF members can submit stories, case studies, and research for publication.</p><button className="btn btn-dark" onClick={()=>setAuthModal("register")}>Become a Contributor <Icons.Arrow /></button></section>
      </>}

      {/* ═══════════ PILLARS ═══════════ */}
      {page==="pillars"&&!viewPillar&&<>
        <section className="hero" style={{minHeight:"45vh"}}><div className="hero-grid"/><div className="hero-content"><div className="hero-badge"><Icons.Zap /> Get Involved</div><h1>Our Four <em>Pillars</em> of Impact</h1><p>Each pillar represents a core area of BIF's mission. Sign up for the pillars that match your expertise, passion, and goals — and gain access to dedicated programmes, resources, and community.</p></div></section>
        <section className="section">
          <div className="pillar-grid">
            {PILLARS.map(p=>(<div className="pillar-card" key={p.id} style={{background:p.gradient}} onClick={()=>openPillar(p)}>
              <div className="pillar-card-icon">{p.icon}</div><h3>{p.title}</h3><p>{p.description}</p>
              <span className="card-link" style={{color:"rgba(255,255,255,0.85)",marginTop:"1rem"}}>Learn More & Sign Up <Icons.Arrow /></span>
            </div>))}
          </div>
        </section>
        <section className="cta-banner"><h2>Not Sure Which Pillar Is Right for You?</h2><p>Join the Community tier for free and explore all four pillars before committing.</p><button className="btn btn-dark" onClick={()=>setAuthModal("register")}>Join Free <Icons.Arrow /></button></section>
      </>}

      {page==="pillars"&&viewPillar&&<>
        <section className="hero" style={{minHeight:"35vh",background:viewPillar.gradient}}><div className="hero-grid"/><div className="hero-content"><button className="btn-back" style={{color:"rgba(255,255,255,0.8)"}} onClick={()=>setViewPillar(null)}><Icons.Back /> All Pillars</button><div className="hero-badge" style={{background:"rgba(255,255,255,0.15)",borderColor:"rgba(255,255,255,0.25)",color:"white"}}>{viewPillar.icon} {viewPillar.title} Pillar</div><h1 style={{fontSize:"clamp(1.8rem,3.5vw,2.8rem)"}}>{viewPillar.title}</h1></div></section>
        <section className="section">
          <div className="pillar-detail">
            <h2>About This Pillar</h2>
            <p>{viewPillar.longDesc}</p>
            <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.2rem",fontWeight:700,marginBottom:"0.75rem"}}>What You Get</h3>
            <ul className="pillar-benefits">
              {viewPillar.benefits.map((b,i)=><li key={i}><Icons.Check />{b}</li>)}
            </ul>
            <div className="pillar-form">
              <h3>Sign Up for {viewPillar.title}</h3>
              {pillarSuccess ? (
                <div className="success-msg"><p>You've successfully signed up for the {viewPillar.title} Pillar! Welcome aboard.</p></div>
              ) : (
                <form onSubmit={handlePillarSignup}>
                  <div className="form-group"><label className="form-label">Full Name</label><input className="form-input" required placeholder="Your name" value={pillarForm.name} onChange={e=>setPillarForm({...pillarForm,name:e.target.value})}/></div>
                  <div className="form-group"><label className="form-label">Email</label><input className="form-input" type="email" required placeholder="you@example.com" value={pillarForm.email} onChange={e=>setPillarForm({...pillarForm,email:e.target.value})}/></div>
                  <div className="form-group"><label className="form-label">Why does this pillar interest you? (optional)</label><textarea className="form-input" rows={3} placeholder="Share your motivation..." style={{resize:"vertical"}} value={pillarForm.motivation} onChange={e=>setPillarForm({...pillarForm,motivation:e.target.value})}/></div>
                  <button className="form-submit" type="submit">Join {viewPillar.title} Pillar</button>
                  {!user && <p style={{fontSize:"0.8rem",color:"var(--gray-500)",textAlign:"center",marginTop:"0.75rem"}}>Not a member yet? <a style={{color:"var(--gold)",cursor:"pointer",fontWeight:600}} onClick={()=>setAuthModal("register")}>Create an account</a> first for full access.</p>}
                </form>
              )}
            </div>
          </div>
        </section>
      </>}

      {/* ═══════════ COMMUNITY ═══════════ */}
      {page==="community"&&<>
        <section className="hero" style={{minHeight:"45vh"}}><div className="hero-grid"/><div className="hero-content"><div className="hero-badge"><Icons.Users /> Connect Globally</div><h1>The BIF <em>Community Hub</em></h1><p>A global platform connecting people of African heritage across continents — for networking, mentorship, knowledge sharing, and collective empowerment.</p><div className="hero-actions"><button className="btn btn-primary" onClick={()=>setAuthModal("register")}>Join the Community <Icons.Arrow /></button></div></div></section>
        <section className="section">
          <div className="section-header center"><div className="section-label">Platform Features</div><h2>Everything You Need to Connect & Grow</h2></div>
          <div className="community-features">
            {[{title:"Global Networking",desc:"Connect with professionals, entrepreneurs, and leaders across 40+ countries. Find collaborators, mentors, and opportunities in our searchable member directory."},{title:"Mentorship Programme",desc:"Get matched with experienced mentors in your field, or give back by mentoring the next generation. Structured programmes with monthly check-ins."},{title:"Discussion Forums",desc:"Join topic-based conversations on entrepreneurship, education, culture, technology, policy, and more. Share insights and build relationships."},{title:"Events & Workshops",desc:"Access virtual and in-person events, webinars, workshops, and exclusive GBIS livestreams. Members get early registration and priority access."}].map((f,i)=>(<div className="community-card" key={i}><h3>{f.title}</h3><p>{f.desc}</p></div>))}
          </div>
        </section>
        <section className="section section-dark">
          <div className="section-header center"><div className="section-label">Global Reach</div><h2>One Community, Six Continents</h2></div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:"0.75rem",maxWidth:750,margin:"0 auto"}}>
            {[{r:"Europe",c:"3,200+"},{r:"Africa",c:"2,800+"},{r:"N. America",c:"1,900+"},{r:"Caribbean",c:"1,100+"},{r:"Middle East",c:"600+"},{r:"S. America",c:"400+"}].map((r,i)=>(<div key={i} style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:10,padding:"1rem",textAlign:"center"}}><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.4rem",fontWeight:700,color:"var(--gold)"}}>{r.c}</div><div style={{fontSize:"0.75rem",color:"var(--gray-400)",marginTop:3}}>{r.r}</div></div>))}
          </div>
        </section>
        <section className="cta-banner"><h2>Your Network Is Your Net Worth</h2><p>Join a community of changemakers dedicated to uplifting the global Black community.</p><button className="btn btn-dark" onClick={()=>navigate("membership")}>Choose Your Tier <Icons.Arrow /></button></section>
      </>}

      {/* ═══════════ MEMBERSHIP ═══════════ */}
      {page==="membership"&&<>
        <section className="hero" style={{minHeight:"42vh"}}><div className="hero-grid"/><div className="hero-content"><div className="hero-badge"><Icons.Star /> Membership</div><h1>Choose Your <em>Level of Impact</em></h1><p>Every tier supports BIF's mission while unlocking progressively deeper access to our global community, resources, and exclusive events.</p></div></section>
        <section className="section">
          <div className="tiers-grid">
            {MEMBERSHIP_TIERS.map((tier,i)=>(<div key={i} className={`tier-card ${tier.popular?"popular":""}`}>
              {tier.popular&&<div className="tier-badge">Most Popular</div>}
              <div className="tier-icon">{tier.icon}</div>
              <div className="tier-name" style={{color:tier.color}}>{tier.name}</div>
              <div className="tier-price">{tier.price}<span>{tier.period}</span></div>
              <div className="tier-desc">{tier.description}</div>
              <ul className="tier-features">{tier.features.map((f,j)=><li key={j}><Icons.Check />{f}</li>)}</ul>
              <button className="tier-btn" style={{background:tier.popular?"var(--gold)":tier.enterprise?"var(--black)":"var(--gray-100)",color:tier.popular?"var(--black)":tier.enterprise?"var(--white)":"var(--gray-700)"}}
                onClick={()=>{ if(tier.enterprise){window.open("mailto:partnerships@blackimpactfoundation.com")} else {setAuthForm({...authForm,tier:tier.name});setAuthModal("register");} }}>
                {tier.enterprise?"Contact for Pricing":tier.price==="Free"?"Join Free":`Get ${tier.name}`}
              </button>
            </div>))}
          </div>
        </section>
        <section className="section section-alt" style={{textAlign:"center"}}>
          <p style={{fontSize:"0.92rem",color:"var(--gray-600)",maxWidth:600,margin:"0 auto",lineHeight:1.7}}>All paid memberships include a 14-day free trial. Cancel anytime. Annual billing available at 20% discount. Corporate and Enterprise memberships are invoiced quarterly or annually.</p>
        </section>
      </>}

      {/* ═══════════ DASHBOARD ═══════════ */}
      {page==="dashboard"&&user&&<>
        <div className="dash-welcome">
          <p style={{fontSize:"0.82rem",color:"var(--gray-400)",marginBottom:3}}>Welcome back,</p>
          <h1>{user.name||"Member"}</h1>
          <p>{user.email}</p>
          <div className="dash-badge" style={{background:tierColor(user.tier).bg,color:tierColor(user.tier).c,border:`1px solid ${tierColor(user.tier).bc}`}}><Icons.Star /> {user.tier} Member</div>
          {user.pillars&&user.pillars.length>0&&<div style={{marginTop:"0.75rem",display:"flex",gap:"0.5rem",flexWrap:"wrap"}}>
            {user.pillars.map(pid=>{const pl=PILLARS.find(p=>p.id===pid);return pl?<span key={pid} style={{background:"rgba(212,168,67,0.1)",color:"var(--gold)",padding:"3px 10px",borderRadius:100,fontSize:"0.72rem",fontWeight:600}}>{pl.title} Pillar</span>:null;})}
          </div>}
          <div className="quick-links">
            {[{p:"community",i:<Icons.Users />,l:"Community Hub"},{p:"news",i:<Icons.Globe />,l:"Latest News"},{p:"insights",i:<Icons.Book />,l:"Insights Library"},{p:"pillars",i:<Icons.Zap />,l:"My Pillars"},{p:"membership",i:<Icons.Star />,l:"Upgrade Tier"}].map(q=>(
              <div className="quick-link" key={q.p} onClick={()=>navigate(q.p)}>{q.i}<span>{q.l}</span></div>
            ))}
          </div>
        </div>
        <section className="section">
          <div className="section-header"><div className="section-label">Your Feed</div><h2>Latest From the Community</h2></div>
          <div className="news-grid">{NEWS_ITEMS.slice(0,3).map(item=>(<div key={item.id} className="news-card" onClick={()=>openArticle(item)}><div className="news-card-img" style={{background:item.image}}><span className="news-card-cat">{item.category}</span></div><div className="news-card-body"><div className="news-card-date"><Icons.Calendar />{item.date}</div><h3>{item.title}</h3><p>{item.excerpt}</p><span className="card-link">Read More <Icons.Arrow /></span></div></div>))}</div>
        </section>
        <section className="section section-dark">
          <div className="section-header"><div className="section-label">Recommended</div><h2>Selected for You</h2></div>
          <div className="insights-grid">{INSIGHTS.slice(0,4).map(item=>(<div key={item.id} className="insight-card" onClick={()=>openInsight(item)}><div className="insight-meta"><span className="insight-type">{item.type}</span><span className="insight-read">{item.readTime}</span></div><h3>{item.title}</h3><p>{item.excerpt.substring(0,120)}...</p><span className="insight-tag">{item.tag}</span></div>))}</div>
        </section>
      </>}

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-brand"><div className="nav-logo" onClick={()=>navigate("home")}><div className="nav-logo-icon">BIF</div>Black Impact Foundation</div><p>Building an inclusive society where no one is left behind. Uniting the global Black community through entrepreneurship, education, research and legal support.</p></div>
          <div><h4>Foundation</h4><ul className="footer-links"><li><a onClick={()=>navigate("about")}>About BIF</a></li><li><a onClick={()=>navigate("pillars")}>Our Pillars</a></li><li><a onClick={()=>navigate("about")}>Leadership</a></li><li><a href="https://globalblackimpact.com" target="_blank" rel="noopener">GBIS Summit</a></li><li><a href="https://www.blackimpactfoundation.com/donation/" target="_blank" rel="noopener">Donate</a></li></ul></div>
          <div><h4>Community</h4><ul className="footer-links"><li><a onClick={()=>navigate("membership")}>Membership</a></li><li><a onClick={()=>navigate("community")}>Community Hub</a></li><li><a onClick={()=>navigate("news")}>News</a></li><li><a onClick={()=>navigate("insights")}>Insights</a></li><li><a onClick={()=>navigate("pillars")}>Pillars</a></li></ul></div>
          <div><h4>Connect</h4><ul className="footer-links"><li><a href="https://www.instagram.com/black_impact_foundation/" target="_blank" rel="noopener">Instagram</a></li><li><a href="https://nl.linkedin.com/company/black-impact-foundation" target="_blank" rel="noopener">LinkedIn</a></li><li><a href="mailto:info@blackimpactfoundation.com">Contact Us</a></li><li><a href="https://www.blackimpactfoundation.com" target="_blank" rel="noopener">Main Website</a></li></ul></div>
        </div>
        <div className="footer-bottom"><p>&copy; {new Date().getFullYear()} Black Impact Foundation. All rights reserved.</p><p><a href="https://www.blackimpactfoundation.com" target="_blank" rel="noopener">blackimpactfoundation.com</a></p></div>
      </footer>
    </div>
  );
}
