const TYPES = {
    CatalogMeta: {
        metadescription: "Contains metadata about a requested Catalog.",
        fields: {
            contentTypes: "Content Types requested in the Catalog."
        }
    },
    RusticiCourseLaunchResponse: {
        metadescription: "Contains data to launch SCORM content through Rustici API.",
        fields: {
            courseTitle: "The title of the Topic Or Course.",
            fullscreenEmbed: "Informs the client whether the SCORM content should be launched in full screen or windowed.",
            height: "The height of the container to launch the SCORM content. This is only applicable for Topic when the topic has configured the `Height` option. Defaults to `680px` for both pop-ups and embedded SCORM files.",
            isRusticiCourse: "Flag to indicate a Course entity in Rustici API.",
            registrationCheckerEndpoint: "The endpoint to check completion status for the current user registration. This requires a `POST` method and request body with JWT. Example curl request: `curl --location --request POST '\<registrationCheckerEndpoint\>' --header 'Content-Type: application/x-www-form-urlencoded' --data-urlencode 'jwt=\<registrationCheckerJWT\>'`",
            registrationCheckerJWT: "The JWT to check completion status for the current user registration.",
            registrationId: "The ID of user registration in Rustici API.",
            url: "The URL to launch SCORM content.",
            width: "The width of the container to launch the SCORM content. This is only applicable for Topic when the topic has configured the `Width` option. Defaults to `1000px` for pop-ups, and 100% for embedded SCORM files."
        }
    },
    SuperQuiz: {
        metadescription: "Contains quiz questions and other data about the entered quiz(s).",
        fields: {
            quizzes: "The IDs of the Quizzes user selects and has access to.",
            questions: "The collection of Quiz questions user selects.",
            totalTimeInSeconds: "The total estimated time for all of the Quiz questions. This is only applicable when all the Quizzes have the `Estimated Time Per Question` option enabled.",
            questionSkipEnabled: "Allows learner to skip questions. This is only applicable when all the selected Quizzes have the `Allow Learner to Skip Questions` option enabled.",
            timerEnabled: "Enables timer. This is only applicable when all the Quizzes have the `Enable Timer` option enabled.",
            navigationDisabled: "Disables navigation during quiz. This is only applicable when all the Quizzes have the `Disable Navigation During Quiz` option enabled.",
            displayAllHints: "Display all hints. This is only applicable when all the Quizzes have the `Display all Hints` option enabled.",
            timePerQuestionInSeconds: "The estimated time per question. This is only applicable when all the Quizzes have the `Estimated Time Per Question` option enabled and use the same value."
        }
    }
};

const ENUMS = {
    TranslationNamespace: {
        metadescription: "The namespace is used to specify the content category for the translations.",
        enumValues: {
            emails: "Used for email content.",
            lms: "Used for platform content."
        }
    }
};

const QUERIES = {
    CompanyTranslations: {
        metadescription: "Returns translations from the user's Thought Industries instance.",
        args: {
            namespace: "The namespace is used to specify the content category for the translations. Accepts values of `lms` for platform content and `emails` for email content."
        }
    },
    Languages: {
        metadescription: "Returns array of Language objects configured in the Thought Industries instance",
        args: {}
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
    },
    Forums: {
        metadescription: "This query returns a forum containing discussion threads within a course, discussion widget, or assignment.",
        args: {
            courseId: "The ID of the course.", 
            clientId: "The ID of the client."
        }
    },
    Threads: {
        metadescription: "This query returns a list of threads.",
        args: {
            courseId: "The ID of the course.", 
            clientId: "The ID of the client.",
            forumId: "The ID of the forum.",
            commentableType: "The type of thread requested, based on the forum's location, e.g. discussion board, assignment, widget thread etc"
        }
    },
    ThreadById: {
        metadescription: "This query returns a thread based on the ID provided.",
        args: {
            id: "The ID of the thread.", 
            clientId: "The ID of the client.", 
            forumId: "The ID of the Forum.", 
            commentableType: "The type of thread requested, based on the forum's location, e.g. discussion board, assignment, widget thread etc."
        }
    },
    Comments: {
        metadescription: "This query returns a list of comments associated with a commentable type.",
        args: {
            clientId: "The ID of the client",
            parentId: "The ID of the parent",
            commentableType: "The type of thread requested, based on the forum's location, e.g. discussion board, assignment, widget thread etc.",
            commentableId: "The ID of the commentable type. ",
            userId: "The ID of the user."
        }
    },
    SearchThreads: {
        metadescription: "This query returns a list of threads based on a search query provided. It also only works for widet threads.",
        args: {
            widgetForumId: "The ID of the Widget Forum.",
            clientId: "The ID of the client.",
            query: "The search query used to return the list of threads.",
            sort: "How the items are to be sorted."
        }
    },
    RusticiLaunchScorm: {
        metadescription: "Returns data to launch SCORM content through Rustici API.",
        args: {
            isPreview: "Requests the preview URL to launch SCORM content. This requires the current user to be in admin or manager role.",
            type: "The type of the Topic Or Course."
        }
    },
    CourseById: {
        metadescription: "Returns various information about the course and the objects that are contained inside of the course, such as the sections, lessons, and pages.",
        args: {
            id: "The ID of the course. Passing the ID of the CourseGroup will not work here. You can get the course ID from the Catalog Content query with the displayCourse field."
        }
    },
    UserContentItems: {
        metadescription: "Returns an array of content to which the current logged in user has access.",
        args: {
            kind: "The kind of content you want to fetch.",
            query: "A query to filter the items. For example, if you only wanted to fetch videos you could pass in 'contentType:Video'. A full list of possible queries can be found here: https://support.thoughtindustries.com/hc/en-us/articles/360046307253-Writing-a-Search-Query",
            sort: "An argument to sort. An example would be 'descending'"
        }
    },
    Pages: {
        metadescription: "Returns an array of Page objects that are found within courses, such as quiz pages, text pages, video pages, and more.",
        args: {
            identifiers: "The IDs of the Page objects. These are available under the CourseById query."
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
    },
    SelectCurrentUserActiveLicense: {
        metadescription: "Changes the active license of the CurrentUser.",
        args: {
            licenseId: "The ID of the License that should be set to 'active' for the CurrentUser.",
        }
    }
}

const DEFINITION_MAP = {
    TYPES,
    ENUMS,
    QUERIES,
    MUTATIONS
}

module.exports = DEFINITION_MAP;
