import React from 'react';

export class Sort extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOrderAsc: true
        };
    }

    handleSortClick() {
        let history = [...this.props.history];
        history = history.reverse();
        let isOrderAsc = this.state.isOrderAsc;
        this.setState({ isOrderAsc: !isOrderAsc });
        this.props.onSort(history, !isOrderAsc)
    }

    render() {
        return <button onClick={() => this.handleSortClick()}>Sort {this.state.isOrderAsc ? 'asc' : 'dec'}</button>
    }
}