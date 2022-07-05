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
    }
};

const MUTATIONS = {
    ArchiveUserCourse: {
        metadescription: "Archives a user's access to a course.",
        args: {
            id: "The ID of the course to be archived."
        }
        
    }
}

const DEFINITION_MAP = {
    ...TYPES,
    ...QUERIES,
    ...MUTATIONS
}

module.exports = DEFINITION_MAP;
