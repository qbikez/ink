import React from 'react';
import {Static, Box, render} from 'ink';
import PQueue from 'p-queue';
import delay from 'delay';
import ms from 'ms';
import Summary from './summary.jsx';
import Test from './test.jsx';

const paths = [
	'tests/login.js',
	'tests/signup.js',
	'tests/forgot-password.js',
	'tests/reset-password.js',
	'tests/view-profile.js',
	'tests/edit-profile.js',
	'tests/delete-profile.js',
	'tests/posts.js',
	'tests/post.js',
	'tests/comments.js'
];

class Jest extends React.Component {
	constructor() {
		super();

		this.state = {
			startTime: Date.now(),
			completedTests: [],
			runningTests: []
		};
	}

	render() {
		const {startTime, completedTests, runningTests} = this.state;

		return (
			<Box flexDirection="column">
				<Static items={completedTests}>
					{test => (
						<Test key={test.path} status={test.status} path={test.path} />
					)}
				</Static>

				{runningTests.length > 0 && (
					<Box flexDirection="column" marginTop={1}>
						{runningTests.map(test => (
							<Test key={test.path} status={test.status} path={test.path} />
						))}
					</Box>
				)}

				<Summary
					isFinished={runningTests.length === 0}
					passed={completedTests.filter(test => test.status === 'pass').length}
					failed={completedTests.filter(test => test.status === 'fail').length}
					time={ms(Date.now() - startTime)}
				/>
			</Box>
		);
	}

	componentDidMount() {
		const queue = new PQueue({concurrency: 4});

		for (const path of paths) {
			queue.add(this.runTest.bind(this, path));
		}
	}

	async runTest(path) {
		this.setState(previousState => ({
			runningTests: [
				...previousState.runningTests,
				{
					status: 'runs',
					path
				}
			]
		}));

		await delay(1000 * Math.random());

		this.setState(previousState => ({
			runningTests: previousState.runningTests.filter(
				test => test.path !== path
			),
			completedTests: [
				...previousState.completedTests,
				{
					status: Math.random() < 0.5 ? 'pass' : 'fail',
					path
				}
			]
		}));
	}
}

render(<Jest />);
