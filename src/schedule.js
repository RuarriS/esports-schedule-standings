import { LitElement, html, css } from 'lit';

import { GraphQLClient, gql } from 'graphql-request';
import { rlcsxStyles } from './style';
import 'animate.css';
import { rlcsxOpts } from './config';




class rlcsSchedule extends LitElement {

    static properties = {
        events: { type: Array }
    }
    constructor() {
        super();

        this.events = [
            {
                id: '',
                name: '',
                startAt: new Date(),
                tournament: {
                    id: "",
                    name: '',
                    slug: ''
                }
            }
        ];

    }
    async firstUpdated() {
        this.events = await this.fetchSchedule();
    }
   
    async fetchSchedule() {


        const endpoint = 'https://api.smash.gg/gql/alpha';
        const graphQLClient = new GraphQLClient(endpoint, {
            headers: {
                authorization: `Bearer ${rlcsxOpts.apikey}`,
            },
        });

        const query = gql`query LeagueSchedule {
            league(slug: "rlcs-2021-22-1") {
              id
              name
              events(query: {
                page: 1,
                perPage: 5,
                filter: {
                    upcoming: true
                }
              }) {
                pageInfo {
                  totalPages
                  total
                }
                nodes {
                  id
                  name
                  startAt
                  tournament {
                    id
                    name
                    slug
                  }
                }
              }
            }
          }`;

        let data = await graphQLClient.request(query);

        console.log(data);
        return data.league.events.nodes;
    }
    static styles = [
        rlcsxStyles,
        css`
        :host {
            display: block;
            background: rgb(33,69,112);
            background: linear-gradient(90deg, rgba(33,69,112,1) 0%, rgba(33,69,112,1) 0%, rgba(53,104,159,1) 100%);
            font-size: 3vw;
        }
        ol {
            list-style: none;
            padding: 0 5%;
            margin: 0;
        }
        li {
            padding: 2em 0 1em 0;
            display: flex;
            flex-flow: row wrap;
            align-items: center;
        }

        li + li {
            border-top: 3px solid rgb(3,11,19);
        }
        
        h3 {
            width: 100%;
            font-size: 1.5em;
            margin: 0;
            padding: 0;
            font-style: italic;
            color: #fff;

            font-family: "BourgeoisUltra","Arial Regular",Arial,sans-serif;
            font-weight: bold;

            line-height: 1;
            text-transform: uppercase;

        }
        .when {
            font-size: 0.75em;
            line-height: 1.35;
            // font-style: italic;
            color: #fff;

            font-family: "Bourgeois W00 Medium","Arial Regular",Arial,sans-serif;
            text-transform: uppercase;

            margin-right: 1em;

        }
        .learn-button-wrap {
            width: 20%;
        }
        .learn-button-inner {
            text-align: center;
            font-size: 0.6em;
        }
        `
    ]
    render() {
        let timeOptions = {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            timeZoneName: "short"

        };
        return html`

        <section class="rlcsx">
            <ol>
                ${this.events ? this.events.map( (event, index) => {
                    let startsAt = new Date(event.startAt * 1000);
                    return html`
                <li class="animate__animated animate__slideInUp" style="--animation-delay: ${index + 5}s;">
                    <h3>${event.tournament.name}</h3>

                    <span class="when">${ startsAt.toLocaleTimeString('en-us', timeOptions).replace(',', " |") } </span>
                        <div class="learn-button-wrap">
                            <div class="learn-button orange" data-tilt="" >
                                <div class="learn-button-inner">
                                    <a class="learn" href="https://smash.gg/${event.tournament.slug}/events"><span>More Info</span></a>
                                </div>
                            </div>
                        </div>
                        
                
                </li>
                `}) : ''}
            </ol>
        </section>
        
    `}
    // createRenderRoot() {
    //     return this;
    // }
}

customElements.define('rlcs-schedule', rlcsSchedule);