import { LitElement, html, css } from 'lit';

import { GraphQLClient, gql } from 'graphql-request';

class tournamentStandings extends LitElement {
    static properties = {
        slug: { type: String },
        teams: { 
          type: Array,
          attribute: false
        },
        active: { type: Boolean }
    }
    constructor() {
        super();  
        
        this.teams = [{
          entrant: {}
        }];

        this.fetchStandings();
    }
    async fetchStandings() {

      const endpoint = 'https://api.smash.gg/gql/alpha';
      const graphQLClient = new GraphQLClient(endpoint, {
        headers: {
          authorization: 'Bearer 0f04ea591f6e58c80d2971583fd1f443',
        },
      });

      const query = gql`query LeagueStandings {
        league(slug: "rlcs-2021-22-1") {
          id
          name
          standings (query: {
            page: 1,
            perPage: 10
          }) {
            pageInfo {
              totalPages
              total
            }
            nodes {
              id
              placement
              entrant {
                id
                name
              }
            }
          }
        }
      }`;

      let data = await graphQLClient.request(query);

      console.log(JSON.stringify(data, undefined, 2));
    }
    firstUpdated() {
      if (this.slug == 'north-america') {
        this.teams = [
          {
            "id": 32795085,
            "placement": 1,
            "entrant": {
              "id": 7838988,
              "name": "ROX Dragons | Knee"
            }
          },
          {
            "id": 32795157,
            "placement": 2,
            "entrant": {
              "id": 7838615,
              "name": "RB | Anakin"
            }
          },
          {
            "id": 32795041,
            "placement": 3,
            "entrant": {
              "id": 7839254,
              "name": "UYU | LowHigh"
            }
          }
      ];
      }
    }
    render() { return html`
        <ol class="ranking">
            ${ this.teams.length > 0 ? this.teams.map( team => html`
                <li>
                    <span class="placement">${team.placement}</span>
                    <img src="http://placehold.it/30/30" /> 
                    <h2>${team.entrant.name}</h2>
                    <span></span>
                </li>
            `) : ''}
        </ol>
    `   
    }
    static styles = [
        css`
        :host {
            font-size: 3vw;
            --orange: rgb(238,128,48);
            display: none;  
        }
        :host([active]) {
            display: block;
        }
        ol.ranking li {
            display: inline-flex;
            flex-flow: row nowrap;
            align-items: center;
            justify-content; flex-start;
            width: 100%;
        }
        .placement {
            color: var(--orange);
        }
        `
    ]
}

customElements.define('rlcs-tournament', tournamentStandings)