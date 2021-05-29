import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, altFilters } from '../fixtures/filters';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach( () => {
  setTextFilter = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  wrapper = shallow(
    <ExpenseListFilters
      filters={filters} 
      setTextFilter={setTextFilter} 
      sortByDate={sortByDate} 
      sortByAmount={sortByAmount} 
      setStartDate={setStartDate} 
      setEndDate={setEndDate}
    />
  );
});

test('should render ExpenseListFilters correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilters with alt data correctly', () => {
    wrapper.setProps ( {
         filters: altFilters
    });
    expect(wrapper).toMatchSnapshot();
});


test('should handle text change correctly', () => {
    const value = 'rent';
    wrapper.find('input').simulate('change', {
        target: { value }
    });
    expect(setTextFilter).toHaveBeenLastCalledWith(value);
});


test('should sort by date correctly', () => {
    const value = 'date';
    wrapper.setProps ( { // set the value to amount to test it goes back to date
        filters: altFilters
   });
    wrapper.find('select').simulate('change', {
        target: { value }
    });
    expect(sortByDate).toHaveBeenCalled();
});

test('should sort by amount correctly', () => {
    const value = 'amount';
    wrapper.find('select').simulate('change', {
        target: { value }
    });
    expect(sortByAmount).toHaveBeenCalled();   
});

// In general you want to find the component that will call the Spy function
// In some cases like this we had to find something inside the HTML components props
// Otherwise the other test are examples of just finding the specific HTML element
test('should handle date changes correctly', () => {
    const startDate = moment(0).add(4, 'years');
    const endDate = moment(0).add(8, 'years');
    wrapper.find('DateRangePicker').prop('onDatesChange')({ startDate, endDate });
    expect(setStartDate).toHaveBeenLastCalledWith(startDate);
    expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

// This is an example of checking something that should cause component state to change.  calendarFocused state.
test('should handle date focus changes correctly', () => {
    const calendarFocused = 'endDate';
    wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused);
    expect(wrapper.state('calendarFocused')).toBe(calendarFocused);  // use toBe for comparing strings
});
