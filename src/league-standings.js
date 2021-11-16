import { LitElement, html } from 'lit';
import './tournament-standings';

class rlcsLeagueStandings extends LitElement {

    _activate(id) {
        let tourneys = this.shadowRoot.querySelectorAll(`rlcs-tournament:not(${id})`);
        tourneys.forEach( el => el.removeAttribute('active'));
        this.shadowRoot.querySelector(id).setAttribute('active', true);
    }
    constructor() {
        super();

       
    }
    render() { return html`
            <section class="standings-wrapper">
                <ul>
                    <li @click="${e => this._activate('#na')}" class="active">North America</li>
                    <li @click="${e => this._activate('#eu')}" >Europe</li>
                    <li @click="${e => this._activate('#oc' )}" >Oceania</li>
                    <li @click="${e => this._activate('#sa')}" >South America</li>
                </ul>
                <rlcs-tournament id="na" slug="north-america" active ></rlcs-tournament>
                <rlcs-tournament id="eu" slug="europe"></rlcs-tournament>
                <rlcs-tournament id="oc" slug="oceania"></rlcs-tournament>
                <rlcs-tournament id="sa" slug="south-america"></rlcs-tournament>
            </section>
    `
    }
}
customElements.define('rlcs-standings', rlcsLeagueStandings);