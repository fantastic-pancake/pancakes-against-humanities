import React from 'react';

export default React.createClass({
	componentWillMount() {
	},
	render() {
		return (
			<div>
				{
					this.props.children
				}
			</div>
		);
	}
});
