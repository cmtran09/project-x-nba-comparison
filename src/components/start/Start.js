import React, { useState } from "react"
import axios from "axios"

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import SportsBasketballIcon from '@material-ui/icons/SportsBasketball'
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import SearchResult from "../SearchResult/SearchResult"
import Player1SeasonAvg from "../Player1SeasonAvg/Player1SeasonAvg"
import Player2SeasonAvg from "../Player2SeasonAvg/Player2SeasonAvg"
import Last5Games from "../Last5Games/Last5Games"

import ComparisonChart from "../ComparisonChart/ComparisonChart"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    maxWidth: 600,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  gird: {
    maxWidth: 600,
  }
}));

export default function Start() {

  const [player1, setPlayer1] = useState(null)
  const [player1Selected, setPlayer1Selected] = useState(false)
  const [player2, setPlayer2] = useState(null)
  const [player2Selected, setPlayer2Selected] = useState(false)
  const [player1Data, setPlayer1Data] = useState(null)
  const [player2Data, setPlayer2Data] = useState(null)

  const [playerSearch, setPlayerSearch] = useState(undefined)
  const [searchResult, setSearchResult] = useState([])

  function getPlayer(e) {
    e.preventDefault()
    axios.get(`https://www.balldontlie.io/api/v1/players?search=${playerSearch}`)
      .then(res => {
        setSearchResult(res.data.data)
      })
      .catch(err => console.log(err))
  }

  function handleChange(e) {
    setPlayerSearch(e.target.value)
  }

  const classes = useStyles();

  return (
    <div className="main-app">
      <p className="cmtran09head">
        Project X - NBA Comparison App
      </p>
      <Grid className={classes.grid} container spacing={3}>
        {/* ================================== PLAYER 1 */}
        <Grid className="grod" item xs={!player1Selected ? 12 : 6}>
          <Paper className={classes.paper}>
            <TextField
              id="player-search"
              disabled={player1Selected && true}
              label="Search Nba Player"
              variant="outlined"
              type="text"
              placeholder="Player 1 (Lebron James)"
              color="primary"
              value={player1Selected ? `${player1.first_name} ${player1.last_name}` : playerSearch}
              onChange={handleChange} />
            <Button
              id="player-search-button"
              disabled={player1Selected && true}
              onClick={e => {
                getPlayer(e)
              }
              }><SportsBasketballIcon />Search<SportsBasketballIcon />
            </Button>
            {searchResult && !player1Selected &&
              <List
                className={`${classes.root} list-results`}
                id="player1-search-result"
                disablePadding={true}
              >
                <SearchResult
                  searchResult={searchResult}
                  setPlayerSearch={setPlayerSearch}
                  setPlayer1={setPlayer1}
                  player1Selected={player1Selected}
                  setPlayer1Selected={setPlayer1Selected}
                  setPlayer2={setPlayer2}
                  player2Selected={player2Selected}
                  setPlayer2Selected={setPlayer2Selected}
                  setSearchResult={setSearchResult}
                />
              </List>
            }
            {player1Selected &&
              <Button
                id="player-search-button"
                disabled={player2Selected && true}
                onClick={e => {
                  setPlayer1Data(null)
                  setPlayer1(null)
                  setPlayer1Selected(false)
                }
                }>REMOVE
              </Button>
            }
          </Paper>
        </Grid>
        {/* ================================== PLAYER 2 */}
        {player1Selected && <Grid item xs={6}>
          <Paper className={classes.paper}>
            <TextField
              id="player-search"
              disabled={player2Selected && true}
              label="Search Nba Player"
              variant="outlined"
              type="text"
              placeholder="Player 2 (Stephen Curry)"
              value={player2Selected ? `${player2.first_name} ${player2.last_name}` : playerSearch}
              color="primary"
              onChange={handleChange} />
            <Button
              id="player-search-button"
              disabled={player2Selected && "disabled"}
              onClick={e => {
                getPlayer(e)
              }
              }><SportsBasketballIcon />Search<SportsBasketballIcon />
            </Button>
            {searchResult && player1Selected &&
              <List
                className={`${classes.root} list-results`}
                id="player2-search-result"
              >
                <SearchResult
                  searchResult={searchResult}
                  setPlayer1={setPlayer1}
                  player1Selected={player1Selected}
                  setPlayer1Selected={setPlayer1Selected}
                  setPlayerSearch={setPlayerSearch}
                  setPlayer2={setPlayer2}
                  player2Selected={player2Selected}
                  setPlayer2Selected={setPlayer2Selected}
                  setSearchResult={setSearchResult}
                />
              </List>
            }
            {player2Selected &&
              <Button
                id="player-search-button"
                onClick={e => {
                  setPlayer2Data(null)
                  setPlayer2(null)
                  setPlayer2Selected(false)
                  setPlayerSearch(undefined)
                }
                }>REMOVE
              </Button>
            }
          </Paper>
        </Grid>}
        {/* ================================== CHART */}
        {
          player1Data &&
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <ComparisonChart
                player1={player1}
                player2={player2}
                player1Data={player1Data}
                player2Data={!player2Data ? null : player2Data}
                setPlayer2Data={setPlayer2Data}
              />
            </Paper>
          </Grid>
        }
        {/*         {/* ================================== PLAYER 1 LAST 5  */}
        {player1 &&
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Player1SeasonAvg
                player1={player1}
                setPlayer1Data={setPlayer1Data}
                player1Data={player1Data}
              />
              <Last5Games player={player1} />
            </Paper>
          </Grid>
        }
        {/*         {/* ================================== PLAYER 2 LAST 5  */}
        {player2 &&
          <Grid item xs={6}>
            <Paper className={classes.paper}>

              <Player2SeasonAvg
                player2={player2}
                setPlayer2Data={setPlayer2Data}
                player2Data={player2Data}
              />
              <Last5Games player={player2} />
            </Paper>
          </Grid>
        }
      </Grid>
    </div >
  )
}
