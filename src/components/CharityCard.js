import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';

class CharityCard extends Component {
	render() {
		const postContentSection = (components) => {
			if (components.length === 0) {
				return <div/>
			}
			return (
				<CardContent className="charity-card-content">
					{components.map((b, i) => b)}
				</CardContent>
			)
		}

		return (
			<Card className="charity-card">
				<CardMedia className="charity-card-media" title={this.props.title} image={this.props.image} onClick={this.props.onImageClick}>
				</CardMedia>
				<CardContent className="charity-card-content">
					<h2 className="charity-card-title" onClick={this.props.onLearnMore}>{this.props.title}</h2>
					<div className="charity-card-subtitle">Request for <span className = "charity-card-action">{this.props.subtitle}</span></div>
					<div className="charity-card-desc">{this.props.description}</div>
					{ this.props.preButtons.map((b, i) => b)}
				</CardContent>
				{this.props.buttons.length !== 0 &&
					<CardActions className ="charity-card-buttons">
					{ this.props.buttons.map((b, i) => b)}
					</CardActions>
				}
				{postContentSection(this.props.postButtons)}
			</Card>
		)
	}
}

CharityCard.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string,
	image: PropTypes.string,
	onImageClick: PropTypes.func,
	preButtons : PropTypes.array.isRequired,
	buttons: PropTypes.array.isRequired,
	postButtons: PropTypes.array.isRequired,
}

export default CharityCard;
