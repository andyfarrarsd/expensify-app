import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseSummary } from '../../components/ExpenseSummary';

test('should render expense total 1 item correctly', () => {
    const wrapper = shallow(<ExpenseSummary expenseCount={1} ExpenseTotal={1234} />);
    expect(wrapper).toMatchSnapshot();
});

test('should render expense total multiple items correctly', () => {
    const wrapper = shallow(<ExpenseSummary expenseCount={3} ExpenseTotal={253500}/>);
    expect(wrapper).toMatchSnapshot();
});
