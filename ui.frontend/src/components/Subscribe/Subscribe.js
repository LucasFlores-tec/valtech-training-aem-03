import React, { Component } from 'react';
import { MapTo } from '@adobe/aem-react-editable-components';
require('./Subscribe.css');

const SubscribeConfig = {
    emptyLabel: 'Subscribe Form',

    isEmpty: function(props) {
        return !props || !props.title || !props.label || !props.authorization;
    }
};

export default class Subscribe extends Component {

    get title() {
        const title = this.props.title;
        const doidera = window.location.href;
        console.log("Teste de URL", doidera)
        return (
            <h3 class="cmp-title">{title}</h3>
        )
    }

    get form() {
        const authorizationMessage = this.props.authorization;
        const btnLabel = this.props.label;

        return (
            <div class="cmp-form">
                <form class="cmp-form__" method="POST" action="newsletter.subscribers.json">
                    <div class="form-group">
                        <label for="form_name">First name *</label>
                        <input id="form_name" type="text" name="name" class="form-control" placeholder="Please enter your firstname *" required="required" data-error="Firstname is required."/>
                    </div>
                    <div class="form-group">
                        <label for="form_lastname">Last name *</label>
                        <input id="form_lastname" type="text" name="surname" class="form-control" placeholder="Please enter your lastname *" required="required" data-error="Lastname is required."/>
                    </div>
                    <div class="form-group">
                        <label for="form_email">Email *</label>
                        <input id="form_email" type="email" name="email" class="form-control" placeholder="Please enter your email *" required="required" data-error="Valid email is required."/>
                    </div>
                    <div class="form-group">
                        <label for="form_anniversary_month">Please specify your month of birthday *</label>
                        <select id="form_anniversary_month" name="anniversary_month" class="form-control-select" required="required" data-error="Please specify your need.">
                            <option value="none" selected disabled>--Select--</option>
                            <option value="january">January</option>
                            <option value="february">February</option>
                            <option value="march">March</option>
                            <option value="april">April</option>
                            <option value="may">May</option>
                            <option value="june">June</option>
                            <option value="july">July</option>
                            <option value="August">August</option>
                            <option value="september">September</option>
                            <option value="october">October</option>
                            <option value="november">November</option>
                            <option value="december">December</option>
                        </select>
                    </div>
                    <div class="cmp-checkbox">
                        <input type="checkbox" id="checkbox" name="authorize" required="required" data-error="To check the box is required."/>
                        <p dangerouslySetInnerHTML={{ __html: authorizationMessage }}></p>
                    </div>
                    <div>
                        <input type="submit" value={btnLabel} class="btn"/>
                    </div>
                </form>
            </div>
        )
    }

    render() {
        if(SubscribeConfig.isEmpty(this.props)) {
            return null;
        }

        return (
            <div>
                <div>{this.title}</div>
                <div>{this.form}</div>
            </div>
        )
    }

};

MapTo('aem-training-03/components/subscribe-form')(Subscribe, SubscribeConfig);
