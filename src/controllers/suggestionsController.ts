import {Request, Response} from "express";
import SuggestionsRepository, {Suggestion} from "../repositories/suggestions";

const selectors = ['city', 'clinicName', 'state', 'suburb'] as const;

type Params = {
    selector: typeof selectors[number];
}

type Query = {
    suggest: string | undefined;
}

const fullStateToAbbreviation = {
    'New South Wales': 'NSW',
    'Victoria': 'VIC',
    'Queensland': 'QLD',
    'South Australia': 'SA',
    'Western Australia': 'WA',
    'Tasmania': 'TAS',
    'Northern Territory': 'NT',
    'Australian Capital Territory': 'ACT',
}

class SuggestionsController {
    repository: SuggestionsRepository;

    constructor() {
        this.repository = new SuggestionsRepository();
    }

    public getSuggestions(req: Request<Params, {}, {}, Query>, res: Response) {
        const {suggest} = req.query;
        const {selector} = req.params;

        let suggestions: Suggestion[] = [];

        switch (selector) {
            case 'city':
                suggestions = this.repository.suggestCity(suggest || '');
                break;
            case 'clinicName':
                suggestions = this.repository.suggestClinic(suggest || '');
                break;
            case 'state':
                suggestions = this.repository.suggestState(suggest || '');
                const fullNameSuggestions = Object.keys(fullStateToAbbreviation)
                    .filter(state => state.toLowerCase().includes(suggest?.toLowerCase() || ''))
                    .map(state => ({suggestion: state}));
                suggestions = suggestions.concat(fullNameSuggestions);
                break;
            case 'suburb':
                suggestions = this.repository.suggestSuburb(suggest || '');
                break;
        }

        const result = Array.from(new Set(suggestions.map(suggestion => suggestion.suggestion)));

        res.status(200).json(result);
    }
}

export default new SuggestionsController();
