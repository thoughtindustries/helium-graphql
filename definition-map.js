const TYPES = {
    CatalogMeta: {
        metadescription: "Contains metadata about a requested Catalog.",
        fields: {
            contentTypes: "Content Types requested in the Catalog."
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
    LoadAssessmentAttemptWithQuestions: {
        metadescription: "Returns an existing or new assessment attempt with questions. This is used when user starts a new assessment attempt, or resumes from an in-progress assessment attempt.",
        args: {
            id: "The ID of the topic.",
            topicType: "The type of the topic.",
            courseId: "The ID of the course.",
            linkedWorkbook: "The ID of the linked workbook.",
            assessmentAttemptId: "The ID of the in-progress assessment attempt to resume from.",
            instructorAssessmentUser: "The ID of the user on behalf of whom the instructor takes the assessment.",
            shouldShuffleAndSubset: "Flag to randomly order questions and choose a subset of questions to use.",
        }
    },
    LoadAssessmentAttemptsByTopicOrCourse: {
        metadescription: "Returns assessment attempts by course and/or topic.",
        args: {
            topicId: "The ID of the topic.",
            courseId: "The ID of the course."
        }
    },
    LoadSuperQuizInfo: {
        metadescription: "Returns super quiz details from user's configuration.",
        args: {
            courseId: "The ID of the course.",
            includeCorrectAnswers: "Flag to include questions the user previously got correct.",
            quizzes: "The IDs of the quiz user selects."
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
            topicId: "The ID of the topic",
            courseId: "The ID of the course.",
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
            clientId: "The ID of the client.",
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
            topicId: "The ID of the topic.",
            courseId: "The ID of the course.",
            completedAssessmentAttemptId: "The ID of the last completed assessment attempt.",
        }
    },
    MergeAssessmentAttemptIntoComplete: {
        metadescription: "Merges an assessment attempt into the last completed assessment attempt. This is used after user finishes reviewing the unanswered questions, the current assessment attempt will be merged to the last completed assessment attempt.",
        args: {
            completedAssessmentAttemptId: "The ID of the last completed assessment attempt.",
            assessmentAttemptId: "The ID of the current assessment attempt."
        }
    }
}

const DEFINITION_MAP = {
    ...TYPES,
    ...QUERIES,
    ...MUTATIONS
}

module.exports = DEFINITION_MAP;
