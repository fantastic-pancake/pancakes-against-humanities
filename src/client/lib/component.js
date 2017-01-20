import {Component, PropTypes, Children} from "react";

export class StoreProvider extends Component {
	static propTypes = {
		stores: PropTypes.object.isRequired,
		services: PropTypes.object.isRequired
	};

	static childContextTypes = {
		stores: PropTypes.object.isRequired,
		services: PropTypes.object.isRequired
	};

	render() {
		return Children.only(this.props.children);
	}

	// now, any item wrapped in this component can ask react for these items
	getChildContext() {
		const {stores, services} = this.props;
		return {stores, services};
	}
}

export class ContainerBase extends Component {
	static contextTypes = {
		stores: PropTypes.object.isRequired,
		services: PropTypes.object.isRequired
	};

	constructor(props) {
		super(props);
		this._disposeFunctions = [];
	}

	subscribe(observable$, callback) {
		const sub = observable$.subscribe(callback);
		this._disposeFunctions.push(() => sub.unsubscribe());
	}

	// invoke the unsubscribe function
	componentWillUnmount() {
		this._disposeFunctions.forEach(d => d());
		this._disposeFunctions = [];
	}

	// allow us to dispatch things without writing out a long line of code
	dispatch(action) {
		this.context.services.dispatcher.emit(action);
	}

	request(action) {
		this.context.services.dispatcher.request(action);
	}
}