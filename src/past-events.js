import { LitElement, html, css } from 'lit';
import {classMap} from 'lit/directives/class-map.js';

import { GraphQLClient, gql } from 'graphql-request';
import { rlcsxStyles } from './style';
import 'animate.css';
import { rlcsxOpts } from './config';




class rlcsPastEvents extends LitElement {

    static properties = {
        sets: { type: Array }
    }
    constructor() {
        super();

        this.sets = [
            {
                winnerId: '',
                startedAt: new Date(),
                games: [
                    {
                        winnerId: "",
                        selections: [
                            {
                                entrant: {
                                    name: "",
                                    id: null,
                                    team: {
                                        images: [
                                            { url: ""}
                                        ]
                                    }
                                }
                            },
                            {
                                entrant: {
                                    name: "",
                                    id: null,
                                    team: {
                                        images: [
                                            { url: ""}
                                        ]
                                    }
                                }
                            }
                        ]
                    }
                ]
            }
        ];

    }
    async firstUpdated() {
        this.sets = await this.fetchPastSchedule();
    }
   
    async fetchPastSchedule(page = 1) {
        try {
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
                    page: ${page}
                    perPage: 5
                    filter: {
                      upcoming: false
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
                      state
                      sets (
                        perPage: 5
                        page: 1
                        sortType: RECENT
                      ){
                        nodes {
                          startedAt
                          displayScore
                          winnerId
                          state
                          games {
                            winnerId
                            selections {
                              entrant {
                                name
                                id
                                team {
                                  id
                                  images {
                                    url
                                  }
                                }
                              }
                              
                            }
                          }
                          fullRoundText
                        }
                      }
                    }
                  }
                }
              }
              `;
    
            let data = await graphQLClient.request(query);
    
            let sets = [];
            data.league.events.nodes.forEach( event => {
                sets = [...sets, ...event.sets.nodes];
            });

            // Filter out sets with no games
            sets = sets.filter( set => {
                if (set.games == null) return false;
                if (set.games.some( game => game.selections == null)) return false;
                return true
            });

            console.log(sets);
    
            return sets;
        } catch(e) {
            console.log('error in query', e);
        }
        
    }
    static styles = [
        rlcsxStyles,
        css`
        :host {
            display: block;
            background: rgb(33,69,112);
            background: linear-gradient(90deg, rgba(33,69,112,1) 0%, rgba(33,69,112,1) 0%, rgba(53,104,159,1) 100%);
            font-size: 1.2vw;
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
            align-items: center;s
        }

        li + li {
            border-top: 3px solid rgb(3,11,19);
        }
        
        h4 {
            width: 100%;
            font-size: 1.25em;
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
            font-size: 1em;
            line-height: 0.8;
            // font-style: italic;
            color: #fff;

            font-family: "Bourgeois W00 Medium","Arial Regular",Arial,sans-serif;
            text-transform: uppercase;

            margin-right: 1em;

            text-align: center;
            flex-grow: 0;

            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);

        }
        .teams-wrap {
            display: inline-flex;
            flex-flow: row nowrap;
            flex-grow: 3;
            margin-left: 2em;
        }
       
        .team {
            display: inline-flex;
            flex-flow: row nowrap;
            align-items: center;
            flex: 1 1 0;
            width: 0;
            opacity: 0.5;
        }
        
        .team-one .team-one,
        .team-two .team-two {
            opacity: 1;
        }
        
        
        .team.team-one {
            justify-content: flex-end;
            text-align: right;
        }
        .team img, .team .placeholder {
            width: 2.5em;
            height: auto;
            filter: saturate(0);
            margin: 0 0.5em;
            display: block;
            flex-shrink: 0;
        }
        .team h4 {
            width: calc(100% - 3em);
            word-wrap: break-word;

        }
        .teams-wrap span {
            font-size: 1.5em;
            font-family: "Bourgeois W00 Medium","Arial Regular",Arial,sans-serif;
            text-transform: uppercase;
            font-style: italic;

            color: #fff;
            flex-basis: 10%;
            text-align: center;
            flex-shrink: 10;
            flex-grow: 0;
        }
        .score-wrap {
            width: 100%;
            display: inline-flex;
            justify-content: center;
            padding-left: 2em; 
            
        }
        .score {
            font-size: 1.25em;
            margin-top: 0.5em;
            padding: 0;
            font-style: italic;
            color: #fff;

            font-family: "BourgeoisUltra","Arial Regular",Arial,sans-serif;
            font-weight: bold;

            line-height: 1;
            text-transform: uppercase;

            color: var(--orange);
            display: inline-block;
            position: relative;
            padding: 0 0.25em 0 0.15em;
            text-align: center;
        }
        .score::after {
            content: '';
            display: block;  
            position: absolute;
            
            top: 50%;
            margin-top: -0.3em;
            width: 0;
            height: 0;
            border-top: 0.2em solid transparent;
            border-right: 0.2em solid transparent;
            border-bottom: 0.2em solid transparent;
            border-left: 0.2em solid transparent;
        }
        .team-one .score::after {
            right: 100%;
            border-right: 0.2em solid var(--orange);
        }
        .team-two .score::after {
            left: 100%;
 
            border-left: 0.2em solid var(--orange);
        }
        
        `
    ]
    render() {
        let timeOptions = {
            month: "short",
            day: "numeric",

        };
        return html`

        <section class="rlcsx">
            <ol>
                ${this.sets ? this.sets.map( (set, index) => {
                    let startsAt = new Date(set.startAt * 1000);
                    let winnerId = set.winnerId;
                    let team1 = set.games[0].selections[0].entrant;
                    let team2 = set.games[0].selections[1].entrant;

                    let team1Score = 0;
                    let team2Score = 0;

                    let winnerClass = {
                        "team-one" : team1.id == winnerId,
                        "team-two" : team2.id == winnerId
                    };
                    let team1Classes = {
                        team: true,
                        "team-one": true,
                        winner : team1.id == winnerId
                    };
                    let team2Classes = {
                        team: true,
                        "team-two": true,
                        winner : team2.id == winnerId
                    };
                    set.games.forEach( game => {
                        if (game.winnerId == team1.id) return team1Score++;
                        if (game.winnerId == team2.id) return team2Score++;
                    });

                    return html`
                <li class="animate__animated animate__slideInUp ${classMap(winnerClass)}" style="--animate-duration: ${index * 0.35}s;">
                    <span class="when">
                        ${(new Date(set.startedAt * 1000)).toLocaleDateString('en-us', {month: "short"})} <br />
                        ${(new Date(set.startedAt * 1000)).toLocaleDateString('en-us', {day: "numeric"})}
                    </span>
                    <div class="teams-wrap">
                        <div class="team team-one"><h4>${team1.name}</h4>${ team1.team.images[0] ? html`<img src="${team1.team.images[0].url}" />`: html`<div class="placeholder"> </div>`}</div>
                        <span>VS.</span>
                        <div class="team team-two">${ team2.team.images[0] ? html`<img src="${team2.team.images[0].url}" />`: html`<div class="placeholder"> </div>`} <h4>${team2.name}</h4></div>
                    </div>
                    <div class="score-wrap">
                        <div class="score">
                            ${team1Score} - ${team2Score}
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

customElements.define('rlcs-past-events', rlcsPastEvents);