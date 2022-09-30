const TYPES = {
    CatalogMeta: {
        metadescription: "Contains metadata about a requested Catalog.",
        fields: {
            contentTypes: "Content Types requested in the Catalog."
        }
    },
    SuperQuiz: {
        metadescription: "Contains quiz questions and other data about the entered quiz(s).",
        fields: {
            quizzes: "The IDs of the Quizzes user selects and has access to.",
            questions: "The collection of Quiz questions user selects.",
            totalTimeInSeconds: "The total estimated time for all of the Quiz questions. This is only applicable when all the selected Quizzes enable the `Estimated Time Per Question` option from the user's Thought Industries instance.",
            questionSkipEnabled: "Allows learner to skip questions. This is only applicable when all the selected Quizzes enable the `Allow Learner to Skip Questions` option from the user's Thought Industries instance.",
            timerEnabled: "Enables timer. This is only applicable when all the selected Quizzes enable the `Enable Timer` option from the user's Thought Industries instance.",
            navigationDisabled: "Disables navigation during quiz. This is only applicable when all the selected Quizzes enable the `Disable Navigation During Quiz` option from the user's Thought Industries instance.",
            displayAllHints: "Display all hints. This is only applicable when all the selected Quizzes enable the `Display all Hints` option from the user's Thought Industries instance.",
            timePerQuestionInSeconds: "The estimated time per question. This is only applicable when all the selected Quizzes enable the `Estimated Time Per Question` option and use the same value from the user's Thought Industries instance."
        }
    }
};

const QUERIES = {
    CompanyTranslations: {
        metadescription: "Returns translations from the user's Thought Industries instance.",
        args: {
            namespace: "test test test"
        }
    },
    CatalogContent: {
        metadescription: "Returns catalog content items and meta data matching with the criterias.",
        args: {
            sortColumn: "The content data column used to sort the collection. Defaults to the value configured for catalog from the user's Thought Industries instance. If the catalog is not configured, it falls back to value `createdAt`. When the value is `relevance`, it requires the argument `query` also to be set, or it falls back to value `courseStartDate`.",
            sortDirection: "The direction used to sort the collection. Defaults to the value configured for catalog from the user's Thought Industries instance. If the catalog is not configured, it falls back to value `desc`. When the argument `sortColumn` is `relevance`, it requires the argument `query` also to be set, or it falls back to value `desc`.",
            resultsDisplayType: "The display type. Defaults to the value configured for catalog from the user's Thought Industries instance. If the catalog is not configured, it falls back to value `grid`. When the value is `calendar`, it overrides the values for argument `sortColumn` to be `displayDate` and `sortDirection` to be `asc`.",
            token: "The secure catalog query. The value is encoded by the secret key of user's Thought Industries instance.",
            labels: "The list of aggregation labels. The order of list items will match with argument `values`.",
            values: "The list of aggregation values. The order of list items will match with argument `labels`.",
            contentTypes: "The list of content types to be queried.",
            query: "The search query."
        }
    },
    LoadAssessmentAttemptWithQuestions: {
        metadescription: "Returns an existing or new assessment attempt with questions. This is used when user starts a new assessment attempt, or resumes from an in-progress assessment attempt.",
        args: {
            id: "The ID of the Topic.",
            topicType: "The type of the Topic.",
            linkedWorkbook: "The ID of the linked workbook.",
            assessmentAttemptId: "The ID of the in-progress assessment attempt to resume from.",
            instructorAssessmentUser: "The ID of the user on behalf of whom the instructor takes the assessment.",
            shouldShuffleAndSubset: "Flag to randomly order questions and choose a subset of questions to use.",
        }
    },
    LoadAssessmentAttemptsByTopicOrCourse: {
        metadescription: "Returns assessment attempts by course and/or topic.",
        args: {}
    },
    LoadSuperQuizInfo: {
        metadescription: "This query loads quiz questions and other data about the entered quiz(s). This query allows you to fetch questions for multiple quizzes at the same time.",
        args: {
            includeCorrectAnswers: "Flag to include questions the user previously got correct.",
            quizzes: "The IDs of the Quizzes user selects."
        }
    }
};

const MUTATIONS = {
    ArchiveUserCourse: {
        metadescription: "Archives a user's access to a course.",
        args: {
            id: "The ID of the course to be archived."
        }
    },
    UpdateAssessmentAttempt: {
        metadescription: "Updates an assessment attempt. This is used to record user's selected choice(s) for the active question, or to record when user finishes the assessment.",
        args: {
            activeQuestion: "The active question with user's selected choice(s).",
            assessmentAttempt: "The assessment attempt to be updated."
        }
    },
    CreateAssessmentAttempt: {
        metadescription: "Creates an assessment attempt for a course assessment. This is used to create a super quiz attempt with user's selected questions.",
        args: {
            questions: "The questions user selected for super quiz."
        }
    },
    CreateAssignmentSubmission: {
        metadescription: "Creates an assignment submission. This is used when user works on a manually graded assessment, the assessment attempt will be associated with the assignment submission.",
        args: {
            body: "The body of the assignment submission.",
            videoAsset: "The URL of the video asset.",
            asset: "The URL of the asset.",
            quizAttempt: "The ID of the assessment attempt.",
            assignment: "The ID of the assignment.",
            course: "The ID of the course."
        }
    },
    CreateComment: {
        metadescription: "Creates a comment.",
        args: {
            commentableId: "The ID of the commentable entity.",
            commentableType: "The type of the commentable entity.",
            body: "The body of the comment.",
            asset: "The URL of the asset.",
            assetFileName: "The file name of the asset.",
            videoAsset: "The ID of the video asset.",
            parentId: "The ID of the parent comment.",
            notificationsEnabled: "Flag to enable notifications."
        }
    },
    CreateUnansweredAssessmentAttempt: {
        metadescription: "Creates an assessment attempt for unanswered questions. This is used when user skips questions during an assessment attempt and decides to review the unanswered questions.",
        args: {
            completedAssessmentAttemptId: "The ID of the last completed assessment attempt.",
        }
    },
    MergeAssessmentAttemptIntoComplete: {
        metadescription: "Merges an assessment attempt into the last completed assessment attempt. This is used after user finishes reviewing the unanswered questions, the current assessment attempt will be merged to the last completed assessment attempt.",
        args: {
            completedAssessmentAttemptId: "The ID of the last completed assessment attempt."
        }
    },
    Login: {
        metadescription: "Attempts to login the user. The mutation will perform a number of checks such as password validity and email verification status. If successful, the user will be logged in and an authentication token returned. If not, an appropriate error will be provided.",
        args: {
            email: "The email of the Current User attempting to log in.",
            password: "The password of the Current User attempting to log in.",
        }
    }
}

const DEFINITION_MAP = {
    TYPES,
    QUERIES,
    MUTATIONS
}

module.exports = DEFINITION_MAP;
