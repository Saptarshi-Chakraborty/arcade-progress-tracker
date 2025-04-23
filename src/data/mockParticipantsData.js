export const mockFacilitator = {
    name: "Priya Sharma", // Changed facilitator name too for consistency
    email: "priya.sharma.facilitator@example.com",
    code: "FACILITATOR789",
    status: "active"
  };
  
  export const mockReportDates = [
    { id: "date1", date: "2025-04-23T00:00:00.000Z", formattedDate: "Apr 23, 2025" },
    { id: "date2", date: "2025-04-22T00:00:00.000Z", formattedDate: "Apr 22, 2025" },
    { id: "date3", date: "2025-04-21T00:00:00.000Z", formattedDate: "Apr 21, 2025" },
    { id: "date4", date: "2025-04-20T00:00:00.000Z", formattedDate: "Apr 20, 2025" },
    { id: "date5", date: "2025-04-19T00:00:00.000Z", formattedDate: "Apr 19, 2025" },
  ];
  
  // Larger pools of completed items for variety (Unchanged)
  const allSkillBadges = [
    "Google Cloud Essentials", "Baseline: Infrastructure", "Kubernetes", "Cloud Architecture",
    "Data Science", "Machine Learning", "DevOps Essentials", "Cloud Security", "Data Analytics",
    "AI Fundamentals", "Networking in Google Cloud", "Serverless Cloud Run Development",
    "Cloud Engineering", "Security Best Practices", "BigQuery for Data Warehousing",
    "Machine Learning Operations (MLOps)", "Cloud Digital Leader", "Associate Cloud Engineer Path",
    "Professional Cloud Architect Path", "Data Engineering Path"
  ];
  
  const allArcadeGames = [
    "Cloud Run", "BigQuery", "Cloud Storage", "App Engine", "Cloud Functions", "Compute Engine",
    "Cloud SQL", "Kubernetes Engine", "Cloud Monitoring", "Cloud Logging", "Pub/Sub",
    "Dataflow", "Dataproc", "AI Platform", "Vertex AI", "Cloud Spanner", "Firestore",
    "Cloud Build", "Artifact Registry", "Secret Manager"
  ];
  
  const allTriviaGames = [
    "Cloud Computing Basics", "Machine Learning Concepts", "Big Data Essentials", "Serverless Architecture",
    "Cloud Security Basics", "DevOps Fundamentals", "Data Engineering", "Kubernetes Trivia",
    "Networking Trivia", "Storage Options", "Compute Choices", "AI/ML Services", "Security Services",
    "Databases in GCP", "Serverless Showdown", "Infrastructure Challenge", "Data Analytics Drill",
    "DevOps Dash", "Security Scramble", "Architecture Ace"
  ];
  
  const allLabFreeCourses = [
    "Introduction to Cloud Computing", "Machine Learning Crash Course", "Cloud Architecture Design",
    "Security in Google Cloud", "Data Analytics Fundamentals", "Introduction to Kubernetes",
    "BigQuery Basics", "Cloud Functions Introduction", "App Engine Overview", "DevOps Concepts",
    "Introduction to AI and ML", "Networking Fundamentals", "Storage Fundamentals", "Compute Engine Basics",
    "Serverless Computing Intro", "Data Engineering Basics", "Security Fundamentals", "Cloud Monitoring Intro",
    "Cloud Logging Intro", "Cost Management in GCP"
  ];
  
  // Helper to get a subset of items (Unchanged)
  const getSubset = (pool, count) => pool.slice(0, count);
  
  // Base participant templates with Indian names
  const baseParticipants = [
    // Original 5 replaced with Indian names
    { $id: "participant1", name: "Aarav Sharma", email: "aarav.sharma@example.com", skillBoostUrl: "https://www.cloudskillsboost.google/profile/aarav-sharma", accessCodeStatus: "Yes" },
    { $id: "participant2", name: "Diya Patel", email: "diya.patel@example.com", skillBoostUrl: "https://www.cloudskillsboost.google/profile/diya-patel", accessCodeStatus: "Yes" },
    { $id: "participant3", name: "Rohan Kumar", email: "rohan.kumar@example.com", skillBoostUrl: "https://www.cloudskillsboost.google/profile/rohan-kumar", accessCodeStatus: "Yes" },
    { $id: "participant4", name: "Ananya Singh", email: "ananya.singh@example.com", skillBoostUrl: "https://www.cloudskillsboost.google/profile/ananya-singh", accessCodeStatus: "Yes" },
    { $id: "participant5", name: "Vikram Gupta", email: "vikram.gupta@example.com", skillBoostUrl: "https://www.cloudskillsboost.google/profile/vikram-gupta", accessCodeStatus: "Yes" },
    // Additional 45 with Indian names
    { $id: "participant6", name: "Isha Verma", email: "isha.verma@example.com", skillBoostUrl: "https://www.cloudskillsboost.google/profile/isha-verma", accessCodeStatus: "Yes" },
    { $id: "participant7", name: "Arjun Reddy", email: "arjun.reddy@example.com", skillBoostUrl: "https://www.cloudskillsboost.google/profile/arjun-reddy", accessCodeStatus: "Yes" },
    { $id: "participant8", name: "Kavya Nair", email: "kavya.nair@example.com", skillBoostUrl: "https://www.cloudskillsboost.google/profile/kavya-nair", accessCodeStatus: "No" }, // Participant with No status
    { $id: "participant9", name: "Aditya Joshi", email: "aditya.joshi@example.com", skillBoostUrl: "https://www.cloudskillsboost.google/profile/aditya-joshi", accessCodeStatus: "Yes" },
    { $id: "participant10", name: "Myra Das", email: "myra.das@example.com", skillBoostUrl: "https://www.cloudskillsboost.google/profile/myra-das", accessCodeStatus: "Yes" },
    { $id: "participant11", name: "Sai Khan", email: "sai.khan@example.com", skillBoostUrl: "https://www.cloudskillsboost.google/profile/sai-khan", accessCodeStatus: "Yes" },
    { $id: "participant12", name: "Priya Shah", email: "priya.shah@example.com", skillBoostUrl: "https://www.cloudskillsboost.google/profile/priya-shah", accessCodeStatus: "Yes" },
    { $id: "participant13", name: "Kabir Ahmed", email: "kabir.ahmed@example.com", skillBoostUrl: "https://www.cloudskillsboost.google/profile/kabir-ahmed", accessCodeStatus: "Yes" },
    { $id: "participant14", name: "Zara Rao", email: "zara.rao@example.com", skillBoostUrl: "https://www.cloudskillsboost.google/profile/zara-rao", accessCodeStatus: "Yes" },
    { $id: "participant15", name: "Vivaan Iyer", email: "vivaan.iyer@example.com", skillBoostUrl: "https://www.cloudskillsboost.google/profile/vivaan-iyer", accessCodeStatus: "Yes" },
    { $id: "participant16", name: "Anika Menon", email: "anika.menon@example.com", skillBoostUrl: "https://www.cloudskillsboost.google/profile/anika-menon", accessCodeStatus: "Yes" },
    { $id: "participant17", name: "Reyansh Patil", email: "reyansh.patil@example.com", skillBoostUrl: "https://www.cloudskillsboost.google/profile/reyansh-patil", accessCodeStatus: "Yes" },
    { $id: "participant18", name: "Kiara Desai", email: "kiara.desai@example.com", skillBoostUrl: "https://www.cloudskillsboost.google/profile/kiara-desai", accessCodeStatus: "Yes" },
    { $id: "participant19", name: "Ishaan Mehta", email: "ishaan.mehta@example.com", skillBoostUrl: "https://www.cloudskillsboost.google/profile/ishaan-mehta", accessCodeStatus: "Yes" },
    { $id: "participant20", name: "Saanvi Agarwal", email: "saanvi.agarwal@example.com", skillBoostUrl: "https://www.cloudskillsboost.google/profile/saanvi-agarwal", accessCodeStatus: "Yes" },
    { $id: "participant21", name: "Neel Jain", email: "neel.jain@example.com", skillBoostUrl: "https://www.cloudskillsboost.google/profile/neel-jain", accessCodeStatus: "Yes" },
    { $id: "participant22", name: "Aadhya Mishra", email: "aadhya.mishra@example.com", skillBoostUrl: "https://www.cloudskillsboost.google/profile/aadhya-mishra", accessCodeStatus: "Yes" },
    { $id: "participant23", name: "Krishna Yadav", email: "krishna.yadav@example.com", skillBoostUrl: "https://www.cloudskillsboost.google/profile/krishna-yadav", accessCodeStatus: "Yes" },
    { $id: "participant24", name: "Siya Malhotra", email: "siya.malhotra@example.com", skillBoostUrl: "https://www.cloudskillsboost.google/profile/siya-malhotra", accessCodeStatus: "Yes" },
    { $id: "participant25", name: "Shaurya Srinivasan", email: "shaurya.srinivasan@example.com", skillBoostUrl: "https://www.cloudskillsboost.google/profile/shaurya-srinivasan", accessCodeStatus: "Yes" },
    { $id: "participant26", name: "Amaira Bhatt", email: "amaira.bhatt@example.com", skillBoostUrl: "https://www.cloudskillsboost.google/profile/amaira-bhatt", accessCodeStatus: "Yes" },
    { $id: "participant27", name: "Atharv Chandra", email: "atharv.chandra@example.com", skillBoostUrl: "https://www.cloudskillsboost.google/profile/atharv-chandra", accessCodeStatus: "Yes" },
    { $id: "participant28", name: "Navya Reddy", email: "navya.reddy@example.com", skillBoostUrl: "https://www.cloudskillsboost.google/profile/navya-reddy", accessCodeStatus: "Yes" },
    { $id: "participant29", name: "Yuvaan Sharma", email: "yuvaan.sharma@example.com", skillBoostUrl: "https://www.cloudskillsboost.google/profile/yuvaan-sharma", accessCodeStatus: "Yes" },
    { $id: "participant30", name: "Anvi Kumar", email: "anvi.kumar@example.com", skillBoostUrl: "https://www.cloudskillsboost.google/profile/anvi-kumar", accessCodeStatus: "Yes" },
    { $id: "participant31", name: "Vihaan Patel", email: "vihaan.patel@example.com", skillBoostUrl: "https://www.cloudskillsboost.google/profile/vihaan-patel", accessCodeStatus: "Yes" },
    { $id: "participant32", name: "Pari Singh", email: "pari.singh@example.com", skillBoostUrl: "https://www.cloudskillsboost.google/profile/pari-singh", accessCodeStatus: "Yes" },
    { $id: "participant33", name: "Advik Gupta", email: "advik.gupta@example.com", skillBoostUrl: "https://www.cloudskillsboost.google/profile/advik-gupta", accessCodeStatus: "Yes" },
    { $id: "participant34", name: "Aisha Verma", email: "aisha.verma@example.com", skillBoostUrl: "https://www.cloudskillsboost.google/profile/aisha-verma", accessCodeStatus: "Yes" },
    { $id: "participant35", name: "Dhruv Reddy", email: "dhruv.reddy@example.com", skillBoostUrl: "https://www.cloudskillsboost.google/profile/dhruv-reddy", accessCodeStatus: "Yes" },
    { $id: "participant36", name: "Rhea Nair", email: "rhea.nair@example.com", skillBoostUrl: "https://www.cloudskillsboost.google/profile/rhea-nair", accessCodeStatus: "Yes" },
    { $id: "participant37", name: "Laksh Joshi", email: "laksh.joshi@example.com", skillBoostUrl: "https://www.cloudskillsboost.google/profile/laksh-joshi", accessCodeStatus: "Yes" },
    { $id: "participant38", name: "Sia Das", email: "sia.das@example.com", skillBoostUrl: "https://www.cloudskillsboost.google/profile/sia-das", accessCodeStatus: "Yes" },
    { $id: "participant39", name: "Mohammad Khan", email: "mohammad.khan@example.com", skillBoostUrl: "https://www.cloudskillsboost.google/profile/mohammad-khan", accessCodeStatus: "Yes" },
    { $id: "participant40", name: "Jiya Shah", email: "jiya.shah@example.com", skillBoostUrl: "https://www.cloudskillsboost.google/profile/jiya-shah", accessCodeStatus: "Yes" },
    { $id: "participant41", name: "Samar Ahmed", email: "samar.ahmed@example.com", skillBoostUrl: "https://www.cloudskillsboost.google/profile/samar-ahmed", accessCodeStatus: "Yes" },
    { $id: "participant42", name: "Tara Rao", email: "tara.rao@example.com", skillBoostUrl: "https://www.cloudskillsboost.google/profile/tara-rao", accessCodeStatus: "Yes" },
    { $id: "participant43", name: "Veer Iyer", email: "veer.iyer@example.com", skillBoostUrl: "https://www.cloudskillsboost.google/profile/veer-iyer", accessCodeStatus: "Yes" },
    { $id: "participant44", name: "Eva Menon", email: "eva.menon@example.com", skillBoostUrl: "https://www.cloudskillsboost.google/profile/eva-menon", accessCodeStatus: "Yes" },
    { $id: "participant45", name: "Ryan Patil", email: "ryan.patil@example.com", skillBoostUrl: "https://www.cloudskillsboost.google/profile/ryan-patil", accessCodeStatus: "Yes" },
    { $id: "participant46", name: "Shanaya Desai", email: "shanaya.desai@example.com", skillBoostUrl: "https://www.cloudskillsboost.google/profile/shanaya-desai", accessCodeStatus: "Yes" },
    { $id: "participant47", name: "Zain Mehta", email: "zain.mehta@example.com", skillBoostUrl: "https://www.cloudskillsboost.google/profile/zain-mehta", accessCodeStatus: "Yes" },
    { $id: "participant48", name: "Aarohi Agarwal", email: "aarohi.agarwal@example.com", skillBoostUrl: "https://www.cloudskillsboost.google/profile/aarohi-agarwal", accessCodeStatus: "Yes" },
    { $id: "participant49", name: "Parth Jain", email: "parth.jain@example.com", skillBoostUrl: "https://www.cloudskillsboost.google/profile/parth-jain", accessCodeStatus: "Yes" },
    { $id: "participant50", name: "Naisha Mishra", email: "naisha.mishra@example.com", skillBoostUrl: "https://www.cloudskillsboost.google/profile/naisha-mishra", accessCodeStatus: "Yes" },
  ];
  
  // Function to generate progress data for a participant (Unchanged logic)
  const generateProgress = (participantIndex, dateIndex) => {
    const baseParticipant = baseParticipants[participantIndex];
    // Define max progress (arbitrary examples, vary these for different participants)
    const maxSkillBadges = (participantIndex % 6 + 1) * 5; // Range 5-30 adjusted slightly
    const maxArcade = Math.floor(maxSkillBadges * 0.5) + (participantIndex % 3); // Add some variation
    const maxTrivia = Math.floor(maxSkillBadges * 0.8) + (participantIndex % 4); // Add some variation
    const maxLabFree = Math.floor(maxSkillBadges * 0.4) + (participantIndex % 2); // Add some variation
  
    // Scale progress based on date (0=date5, 4=date1)
    // Base scale: 0.1 (date5) -> 0.3 -> 0.5 -> 0.7 -> 0.9 (date1) roughly
    const baseScale = 0.1 + dateIndex * 0.2;
    // Add participant-specific variation and some randomness
    const participantFactor = 1 + (participantIndex % 10) * 0.02 - 0.05; // +/- 5% based on index
    const randomFactor = Math.random() * 0.1 - 0.05; // +/- 5% random noise
    const scale = Math.max(0, Math.min(1, baseScale * participantFactor + randomFactor));
  
    const noOfSkillBadgesCompleted = Math.min(maxSkillBadges, Math.max(0, Math.floor(maxSkillBadges * scale)));
    const noOfArcadeGamesCompleted = Math.min(maxArcade, Math.max(0, Math.floor(maxArcade * scale * 1.1))); // Slightly different scaling
    const noOfTriviaGamesCompleted = Math.min(maxTrivia, Math.max(0, Math.floor(maxTrivia * scale * 0.9))); // Slightly different scaling
    const noOfLabFreeCoursesCompleted = Math.min(maxLabFree, Math.max(0, Math.floor(maxLabFree * scale)));
  
    let milestoneEarned = "None";
    // Adjust milestone thresholds if needed based on typical progression
    if (noOfSkillBadgesCompleted >= 25) { // Example thresholds
      milestoneEarned = "Milestone 3";
    } else if (noOfSkillBadgesCompleted >= 15) {
      milestoneEarned = "Milestone 2";
    } else if (noOfSkillBadgesCompleted >= 5) {
      milestoneEarned = "Milestone 1";
    }
  
     // Special case for participant 8 (index 7) who has no access code
     if (participantIndex === 7) {
       return {
         ...baseParticipant,
         noOfSkillBadgesCompleted: 0,
         noOfArcadeGamesCompleted: 0,
         noOfTriviaGamesCompleted: 0,
         noOfLabFreeCoursesCompleted: 0,
         milestoneEarned: "None",
         skillBadgesCompleted: [],
         arcadeGamesCompleted: [],
         triviaGamesCompleted: [],
         labFreeCoursesCompleted: []
       };
     }
  
    return {
      ...baseParticipant,
      noOfSkillBadgesCompleted,
      noOfArcadeGamesCompleted,
      noOfTriviaGamesCompleted,
      noOfLabFreeCoursesCompleted,
      milestoneEarned,
      // Use helper to get subsets based on counts
      skillBadgesCompleted: getSubset(allSkillBadges, noOfSkillBadgesCompleted),
      arcadeGamesCompleted: getSubset(allArcadeGames, noOfArcadeGamesCompleted),
      triviaGamesCompleted: getSubset(allTriviaGames, noOfTriviaGamesCompleted),
      labFreeCoursesCompleted: getSubset(allLabFreeCourses, noOfLabFreeCoursesCompleted)
    };
  };
  
  // Create participant data for each date (Unchanged logic)
  export const participantsByDate = {
    date1: Array.from({ length: 50 }, (_, i) => generateProgress(i, 4)), // dateIndex 4 (latest)
    date2: Array.from({ length: 50 }, (_, i) => generateProgress(i, 3)), // dateIndex 3
    date3: Array.from({ length: 50 }, (_, i) => generateProgress(i, 2)), // dateIndex 2
    date4: Array.from({ length: 50 }, (_, i) => generateProgress(i, 1)), // dateIndex 1
    date5: Array.from({ length: 50 }, (_, i) => generateProgress(i, 0)), // dateIndex 0 (earliest)
  };
  
  
  // ----- IMPORTANT: Original Hand-Crafted Data OVERRIDE -----
  // The following section overrides the generated data for the *first 5 participants*
  // with specific, hand-crafted values. If you want purely generated data based on
  // the new Indian names and the `generateProgress` function for *all* participants,
  // you should DELETE or COMMENT OUT this entire `originalParticipantsByDate` block
  // and the `Apply the original data...` loop that follows it.
  
  // Define the original data structure but using the *new* Indian names for the first 5 participants
  const originalParticipantsByDate = {
    date1: [
      {
        ...baseParticipants[0], // Aarav Sharma
        noOfSkillBadgesCompleted: 18, noOfArcadeGamesCompleted: 7, noOfTriviaGamesCompleted: 12, noOfLabFreeCoursesCompleted: 6, milestoneEarned: "Milestone 2",
        skillBadgesCompleted: ["Google Cloud Essentials", "Baseline: Infrastructure", "Kubernetes", "Cloud Architecture", "Data Science", "Machine Learning"],
        arcadeGamesCompleted: ["Cloud Run", "BigQuery", "Cloud Storage", "App Engine"],
        triviaGamesCompleted: ["Cloud Computing Basics", "Machine Learning Concepts", "Big Data Essentials", "Serverless Architecture"],
        labFreeCoursesCompleted: ["Introduction to Cloud Computing", "Machine Learning Crash Course", "Cloud Architecture Design"]
      },
      {
        ...baseParticipants[1], // Diya Patel
        noOfSkillBadgesCompleted: 25, noOfArcadeGamesCompleted: 12, noOfTriviaGamesCompleted: 20, noOfLabFreeCoursesCompleted: 9, milestoneEarned: "Milestone 3",
        skillBadgesCompleted: ["Google Cloud Essentials", "Baseline: Infrastructure", "Kubernetes", "Cloud Architecture", "Data Science", "Machine Learning", "DevOps Essentials", "Cloud Security", "Data Analytics"],
        arcadeGamesCompleted: ["Cloud Run", "BigQuery", "Cloud Storage", "App Engine", "Cloud Functions", "Compute Engine"],
        triviaGamesCompleted: ["Cloud Computing Basics", "Machine Learning Concepts", "Big Data Essentials", "Serverless Architecture", "Cloud Security Basics", "DevOps Fundamentals"],
        labFreeCoursesCompleted: ["Introduction to Cloud Computing", "Machine Learning Crash Course", "Cloud Architecture Design", "Security in Google Cloud"]
      },
      {
        ...baseParticipants[2], // Rohan Kumar
        noOfSkillBadgesCompleted: 12, noOfArcadeGamesCompleted: 5, noOfTriviaGamesCompleted: 9, noOfLabFreeCoursesCompleted: 4, milestoneEarned: "Milestone 1",
        skillBadgesCompleted: ["Google Cloud Essentials", "Baseline: Infrastructure", "Kubernetes", "Cloud Architecture"],
        arcadeGamesCompleted: ["Cloud Run", "BigQuery", "Cloud Storage"],
        triviaGamesCompleted: ["Cloud Computing Basics", "Machine Learning Concepts", "Big Data Essentials"],
        labFreeCoursesCompleted: ["Introduction to Cloud Computing", "Machine Learning Crash Course"]
      },
      {
        ...baseParticipants[3], // Ananya Singh
        noOfSkillBadgesCompleted: 5, noOfArcadeGamesCompleted: 2, noOfTriviaGamesCompleted: 4, noOfLabFreeCoursesCompleted: 1, milestoneEarned: "None",
        skillBadgesCompleted: ["Google Cloud Essentials", "Baseline: Infrastructure"],
        arcadeGamesCompleted: ["Cloud Run"],
        triviaGamesCompleted: ["Cloud Computing Basics"],
        labFreeCoursesCompleted: ["Introduction to Cloud Computing"]
      },
      {
        ...baseParticipants[4], // Vikram Gupta
        noOfSkillBadgesCompleted: 30, noOfArcadeGamesCompleted: 15, noOfTriviaGamesCompleted: 25, noOfLabFreeCoursesCompleted: 12, milestoneEarned: "Milestone 3",
        skillBadgesCompleted: ["Google Cloud Essentials", "Baseline: Infrastructure", "Kubernetes", "Cloud Architecture", "Data Science", "Machine Learning", "DevOps Essentials", "Cloud Security", "Data Analytics", "AI Fundamentals"],
        arcadeGamesCompleted: ["Cloud Run", "BigQuery", "Cloud Storage", "App Engine", "Cloud Functions", "Compute Engine", "Cloud SQL"],
        triviaGamesCompleted: ["Cloud Computing Basics", "Machine Learning Concepts", "Big Data Essentials", "Serverless Architecture", "Cloud Security Basics", "DevOps Fundamentals", "Data Engineering"],
        labFreeCoursesCompleted: ["Introduction to Cloud Computing", "Machine Learning Crash Course", "Cloud Architecture Design", "Security in Google Cloud", "Data Analytics Fundamentals"]
      }
    ],
    date2: [
       {
        ...baseParticipants[0], // Aarav Sharma
        noOfSkillBadgesCompleted: 15, noOfArcadeGamesCompleted: 5, noOfTriviaGamesCompleted: 10, noOfLabFreeCoursesCompleted: 5, milestoneEarned: "Milestone 2",
        skillBadgesCompleted: ["Google Cloud Essentials", "Baseline: Infrastructure", "Kubernetes", "Cloud Architecture", "Data Science"],
        arcadeGamesCompleted: ["Cloud Run", "BigQuery", "Cloud Storage"],
        triviaGamesCompleted: ["Cloud Computing Basics", "Machine Learning Concepts", "Big Data Essentials"],
        labFreeCoursesCompleted: ["Introduction to Cloud Computing", "Machine Learning Crash Course"]
      },
      {
        ...baseParticipants[1], // Diya Patel
        noOfSkillBadgesCompleted: 22, noOfArcadeGamesCompleted: 10, noOfTriviaGamesCompleted: 18, noOfLabFreeCoursesCompleted: 7, milestoneEarned: "Milestone 2",
        skillBadgesCompleted: ["Google Cloud Essentials", "Baseline: Infrastructure", "Kubernetes", "Cloud Architecture", "Data Science", "Machine Learning", "DevOps Essentials"],
        arcadeGamesCompleted: ["Cloud Run", "BigQuery", "Cloud Storage", "App Engine", "Cloud Functions"],
        triviaGamesCompleted: ["Cloud Computing Basics", "Machine Learning Concepts", "Big Data Essentials", "Serverless Architecture", "Cloud Security Basics"],
        labFreeCoursesCompleted: ["Introduction to Cloud Computing", "Machine Learning Crash Course", "Cloud Architecture Design"]
      },
      {
        ...baseParticipants[2], // Rohan Kumar
        noOfSkillBadgesCompleted: 10, noOfArcadeGamesCompleted: 4, noOfTriviaGamesCompleted: 7, noOfLabFreeCoursesCompleted: 3, milestoneEarned: "Milestone 1",
        skillBadgesCompleted: ["Google Cloud Essentials", "Baseline: Infrastructure", "Kubernetes"],
        arcadeGamesCompleted: ["Cloud Run", "BigQuery"],
        triviaGamesCompleted: ["Cloud Computing Basics", "Machine Learning Concepts"],
        labFreeCoursesCompleted: ["Introduction to Cloud Computing"]
      },
      {
        ...baseParticipants[3], // Ananya Singh
        noOfSkillBadgesCompleted: 3, noOfArcadeGamesCompleted: 1, noOfTriviaGamesCompleted: 2, noOfLabFreeCoursesCompleted: 0, milestoneEarned: "None",
        skillBadgesCompleted: ["Google Cloud Essentials"],
        arcadeGamesCompleted: ["Cloud Run"],
        triviaGamesCompleted: ["Cloud Computing Basics"],
        labFreeCoursesCompleted: []
      },
      {
        ...baseParticipants[4], // Vikram Gupta
        noOfSkillBadgesCompleted: 28, noOfArcadeGamesCompleted: 13, noOfTriviaGamesCompleted: 22, noOfLabFreeCoursesCompleted: 10, milestoneEarned: "Milestone 3",
        skillBadgesCompleted: ["Google Cloud Essentials", "Baseline: Infrastructure", "Kubernetes", "Cloud Architecture", "Data Science", "Machine Learning", "DevOps Essentials", "Cloud Security", "Data Analytics"],
        arcadeGamesCompleted: ["Cloud Run", "BigQuery", "Cloud Storage", "App Engine", "Cloud Functions", "Compute Engine"],
        triviaGamesCompleted: ["Cloud Computing Basics", "Machine Learning Concepts", "Big Data Essentials", "Serverless Architecture", "Cloud Security Basics", "DevOps Fundamentals"],
        labFreeCoursesCompleted: ["Introduction to Cloud Computing", "Machine Learning Crash Course", "Cloud Architecture Design", "Security in Google Cloud"]
      }
    ],
    date3: [
       {
        ...baseParticipants[0], // Aarav Sharma
        noOfSkillBadgesCompleted: 12, noOfArcadeGamesCompleted: 4, noOfTriviaGamesCompleted: 8, noOfLabFreeCoursesCompleted: 3, milestoneEarned: "Milestone 1",
        skillBadgesCompleted: ["Google Cloud Essentials", "Baseline: Infrastructure", "Kubernetes", "Cloud Architecture"],
        arcadeGamesCompleted: ["Cloud Run", "BigQuery"],
        triviaGamesCompleted: ["Cloud Computing Basics", "Machine Learning Concepts"],
        labFreeCoursesCompleted: ["Introduction to Cloud Computing"]
      },
      {
        ...baseParticipants[1], // Diya Patel
        noOfSkillBadgesCompleted: 18, noOfArcadeGamesCompleted: 8, noOfTriviaGamesCompleted: 15, noOfLabFreeCoursesCompleted: 5, milestoneEarned: "Milestone 2",
        skillBadgesCompleted: ["Google Cloud Essentials", "Baseline: Infrastructure", "Kubernetes", "Cloud Architecture", "Data Science", "Machine Learning"],
        arcadeGamesCompleted: ["Cloud Run", "BigQuery", "Cloud Storage", "App Engine"],
        triviaGamesCompleted: ["Cloud Computing Basics", "Machine Learning Concepts", "Big Data Essentials", "Serverless Architecture"],
        labFreeCoursesCompleted: ["Introduction to Cloud Computing", "Machine Learning Crash Course"]
      },
      {
        ...baseParticipants[2], // Rohan Kumar
        noOfSkillBadgesCompleted: 8, noOfArcadeGamesCompleted: 3, noOfTriviaGamesCompleted: 5, noOfLabFreeCoursesCompleted: 2, milestoneEarned: "Milestone 1",
        skillBadgesCompleted: ["Google Cloud Essentials", "Baseline: Infrastructure"],
        arcadeGamesCompleted: ["Cloud Run"],
        triviaGamesCompleted: ["Cloud Computing Basics"],
        labFreeCoursesCompleted: ["Introduction to Cloud Computing"]
      },
      {
        ...baseParticipants[3], // Ananya Singh
        noOfSkillBadgesCompleted: 2, noOfArcadeGamesCompleted: 0, noOfTriviaGamesCompleted: 1, noOfLabFreeCoursesCompleted: 0, milestoneEarned: "None",
        skillBadgesCompleted: ["Google Cloud Essentials"],
        arcadeGamesCompleted: [],
        triviaGamesCompleted: ["Cloud Computing Basics"],
        labFreeCoursesCompleted: []
      },
      {
        ...baseParticipants[4], // Vikram Gupta
        noOfSkillBadgesCompleted: 25, noOfArcadeGamesCompleted: 12, noOfTriviaGamesCompleted: 20, noOfLabFreeCoursesCompleted: 8, milestoneEarned: "Milestone 2",
        skillBadgesCompleted: ["Google Cloud Essentials", "Baseline: Infrastructure", "Kubernetes", "Cloud Architecture", "Data Science", "Machine Learning", "DevOps Essentials", "Cloud Security"],
        arcadeGamesCompleted: ["Cloud Run", "BigQuery", "Cloud Storage", "App Engine", "Cloud Functions"],
        triviaGamesCompleted: ["Cloud Computing Basics", "Machine Learning Concepts", "Big Data Essentials", "Serverless Architecture", "Cloud Security Basics"],
        labFreeCoursesCompleted: ["Introduction to Cloud Computing", "Machine Learning Crash Course", "Cloud Architecture Design"]
      }
    ],
    date4: [
       {
        ...baseParticipants[0], // Aarav Sharma
        noOfSkillBadgesCompleted: 8, noOfArcadeGamesCompleted: 2, noOfTriviaGamesCompleted: 5, noOfLabFreeCoursesCompleted: 2, milestoneEarned: "Milestone 1",
        skillBadgesCompleted: ["Google Cloud Essentials", "Baseline: Infrastructure"],
        arcadeGamesCompleted: ["Cloud Run"],
        triviaGamesCompleted: ["Cloud Computing Basics"],
        labFreeCoursesCompleted: ["Introduction to Cloud Computing"]
      },
      {
        ...baseParticipants[1], // Diya Patel
        noOfSkillBadgesCompleted: 15, noOfArcadeGamesCompleted: 6, noOfTriviaGamesCompleted: 10, noOfLabFreeCoursesCompleted: 3, milestoneEarned: "Milestone 1",
        skillBadgesCompleted: ["Google Cloud Essentials", "Baseline: Infrastructure", "Kubernetes", "Cloud Architecture", "Data Science"],
        arcadeGamesCompleted: ["Cloud Run", "BigQuery", "Cloud Storage"],
        triviaGamesCompleted: ["Cloud Computing Basics", "Machine Learning Concepts", "Big Data Essentials"],
        labFreeCoursesCompleted: ["Introduction to Cloud Computing"]
      },
      {
        ...baseParticipants[2], // Rohan Kumar
        noOfSkillBadgesCompleted: 5, noOfArcadeGamesCompleted: 1, noOfTriviaGamesCompleted: 3, noOfLabFreeCoursesCompleted: 1, milestoneEarned: "None",
        skillBadgesCompleted: ["Google Cloud Essentials"],
        arcadeGamesCompleted: ["Cloud Run"],
        triviaGamesCompleted: ["Cloud Computing Basics"],
        labFreeCoursesCompleted: ["Introduction to Cloud Computing"]
      },
      {
        ...baseParticipants[3], // Ananya Singh
        noOfSkillBadgesCompleted: 0, noOfArcadeGamesCompleted: 0, noOfTriviaGamesCompleted: 0, noOfLabFreeCoursesCompleted: 0, milestoneEarned: "None",
        skillBadgesCompleted: [], arcadeGamesCompleted: [], triviaGamesCompleted: [], labFreeCoursesCompleted: []
      },
      {
        ...baseParticipants[4], // Vikram Gupta
        noOfSkillBadgesCompleted: 20, noOfArcadeGamesCompleted: 10, noOfTriviaGamesCompleted: 15, noOfLabFreeCoursesCompleted: 6, milestoneEarned: "Milestone 2",
        skillBadgesCompleted: ["Google Cloud Essentials", "Baseline: Infrastructure", "Kubernetes", "Cloud Architecture", "Data Science", "Machine Learning", "DevOps Essentials"],
        arcadeGamesCompleted: ["Cloud Run", "BigQuery", "Cloud Storage", "App Engine", "Cloud Functions"],
        triviaGamesCompleted: ["Cloud Computing Basics", "Machine Learning Concepts", "Big Data Essentials", "Serverless Architecture"],
        labFreeCoursesCompleted: ["Introduction to Cloud Computing", "Machine Learning Crash Course", "Cloud Architecture Design"]
      }
    ],
    date5: [
       {
        ...baseParticipants[0], // Aarav Sharma
        noOfSkillBadgesCompleted: 5, noOfArcadeGamesCompleted: 1, noOfTriviaGamesCompleted: 2, noOfLabFreeCoursesCompleted: 1, milestoneEarned: "None",
        skillBadgesCompleted: ["Google Cloud Essentials"],
        arcadeGamesCompleted: ["Cloud Run"],
        triviaGamesCompleted: ["Cloud Computing Basics"],
        labFreeCoursesCompleted: ["Introduction to Cloud Computing"]
      },
      {
        ...baseParticipants[1], // Diya Patel
        noOfSkillBadgesCompleted: 10, noOfArcadeGamesCompleted: 3, noOfTriviaGamesCompleted: 5, noOfLabFreeCoursesCompleted: 2, milestoneEarned: "Milestone 1",
        skillBadgesCompleted: ["Google Cloud Essentials", "Baseline: Infrastructure", "Kubernetes"],
        arcadeGamesCompleted: ["Cloud Run", "BigQuery"],
        triviaGamesCompleted: ["Cloud Computing Basics", "Machine Learning Concepts"],
        labFreeCoursesCompleted: ["Introduction to Cloud Computing"]
      },
      {
        ...baseParticipants[2], // Rohan Kumar
        noOfSkillBadgesCompleted: 3, noOfArcadeGamesCompleted: 0, noOfTriviaGamesCompleted: 1, noOfLabFreeCoursesCompleted: 0, milestoneEarned: "None",
        skillBadgesCompleted: ["Google Cloud Essentials"],
        arcadeGamesCompleted: [],
        triviaGamesCompleted: ["Cloud Computing Basics"],
        labFreeCoursesCompleted: []
      },
      {
        ...baseParticipants[3], // Ananya Singh
        noOfSkillBadgesCompleted: 0, noOfArcadeGamesCompleted: 0, noOfTriviaGamesCompleted: 0, noOfLabFreeCoursesCompleted: 0, milestoneEarned: "None",
        skillBadgesCompleted: [], arcadeGamesCompleted: [], triviaGamesCompleted: [], labFreeCoursesCompleted: []
      },
      {
        ...baseParticipants[4], // Vikram Gupta
        noOfSkillBadgesCompleted: 15, noOfArcadeGamesCompleted: 6, noOfTriviaGamesCompleted: 10, noOfLabFreeCoursesCompleted: 4, milestoneEarned: "Milestone 1",
        skillBadgesCompleted: ["Google Cloud Essentials", "Baseline: Infrastructure", "Kubernetes", "Cloud Architecture", "Data Science"],
        arcadeGamesCompleted: ["Cloud Run", "BigQuery", "Cloud Storage"],
        triviaGamesCompleted: ["Cloud Computing Basics", "Machine Learning Concepts", "Big Data Essentials"],
        labFreeCoursesCompleted: ["Introduction to Cloud Computing", "Machine Learning Crash Course"]
      }
    ]
  };
  
  // Apply the original data back onto the generated data for the first 5 participants
  // (Comment out/delete this loop if you want ALL participants to use generated progress)
  mockReportDates.forEach(reportDate => {
    const dateId = reportDate.id;
    if (originalParticipantsByDate[dateId]) {
        for (let i = 0; i < 5; i++) {
            // Ensure base participant data (name, email, url, id, status) comes from the updated baseParticipants
            const baseInfo = baseParticipants[i];
            // Merge base info with the specific progress data from originalParticipantsByDate
            if (participantsByDate[dateId] && participantsByDate[dateId][i] && originalParticipantsByDate[dateId][i]) {
                participantsByDate[dateId][i] = {
                  ...baseInfo, // Use updated name/email/etc.
                  ...originalParticipantsByDate[dateId][i] // Keep original progress numbers/lists
                };
                // Remove the duplicate base participant info that might come from the spread
                delete participantsByDate[dateId][i]['$id'];
                delete participantsByDate[dateId][i]['name'];
                delete participantsByDate[dateId][i]['email'];
                delete participantsByDate[dateId][i]['skillBoostUrl'];
                delete participantsByDate[dateId][i]['accessCodeStatus'];
                // Re-add the correct base info
                participantsByDate[dateId][i] = { ...baseInfo, ...participantsByDate[dateId][i]};
            }
        }
    }
  });
  
  
  // For backward compatibility - export the latest date's participants (Unchanged)
  export const mockParticipants = participantsByDate.date1;