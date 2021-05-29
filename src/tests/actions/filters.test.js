import moment from 'moment';
import { setStartDate, setEndDate, setTextFilter, sortByAmount, sortByDate } from '../../actions/filters';

test('should generate set start date action object', () => {
const action = setStartDate(moment(0));
expect(action).toEqual({
    type: 'SET_START_DATE',
    startDate: moment(0)
    });
});

test('should generate set end date action object', () => {
const action = setEndDate(moment(0));
expect(action).toEqual({
    type: 'SET_END_DATE',
    endDate: moment(0)
    });
});

test('should generate set text action object', () => {
    const text = 'Rent';
    const action = setTextFilter(text);
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text
    });
});

test('should generate set text action object default', () => {
    const action = setTextFilter();
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: ''
    });
});

test('should generate set sort by Amount action object', () => {
    const action = sortByAmount();
    expect(action).toEqual({
        type: 'SORT_BY_AMOUNT',
    });
});

test('should generate set sort by Date action object', () => {
    const action = sortByDate();
    expect(action).toEqual({
        type: 'SORT_BY_DATE',
    });

    // or
    // expect(sortByDate()).toEqual({ type: 'SORT_BY_DATE'});

});



