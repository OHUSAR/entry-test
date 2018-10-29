import '@material/image-list/dist/mdc.image-list.css';
import '@material/switch/dist/mdc.switch.css';
import '@material/textfield/dist/mdc.textfield.css';
import { CircularProgress } from '@rmwc/circular-progress';
import '@rmwc/circular-progress/circular-progress.css';
import { ImageList, ImageListImage, ImageListImageAspectContainer, ImageListItem, ImageListLabel, ImageListSupporting, } from '@rmwc/image-list';
import { Switch } from '@rmwc/switch';
import { TextField, TextFieldHelperText } from '@rmwc/textfield';
import gql from 'graphql-tag';
import * as React from 'react';
import { Query } from 'react-apollo';
import './App.css';

import { ApolloProvider } from "react-apollo";
import {Simulate} from "react-dom/test-utils";
import load = Simulate.load;

const GET_ARTIST = gql`
    query getArtists($artistName: String){
        queryArtists(byName: $artistName) {
            id
            name
            image
        }
    }
`;

interface IArtist{
    id: string;
    name: string;
    image: string;
}

const pictureAlbumCover = (artistName: string, standardLayout: boolean) => (
    <Query variables={{artistName, standardLayout}} query={GET_ARTIST}>
        {({loading, error, data}) => {
            console.log(artistName);
            if (artistName === ""){ return ""};
            if (loading) {return <CircularProgress style={{display: "block"}}/>};
            if (error) {return ""};
            let styleListItem: any;
            let propList: any = {style: {paddingTop: "20px"}};
            if (standardLayout){
                styleListItem = { margin: '2px', width: 'calc(100% / 5 - 4.2px)' };
            } else {
                styleListItem = { marginBottom: '16px' };
                propList = { masonry: true, withTextProtection: true, style: {columnCount: 5, columnGap: '16px', maxWidth: '1000px', paddingTop: "20px"}};
            }
            return(
                <ImageList {...propList}>
                    {data.queryArtists.map((artist: IArtist) => {
                        return (
                            <ImageListItem key={artist.id} style={styleListItem}>
                                {standardLayout ? (
                                    <ImageListImageAspectContainer style={{ paddingBottom: 'calc(100% / 1.5)' }}>
                                        <ImageListImage src={artist.image} />
                                    </ImageListImageAspectContainer>
                                ) : (<ImageListImage src={artist.image} /> )}
                                <ImageListSupporting>
                                    <ImageListLabel>{artist.name}</ImageListLabel>
                                </ImageListSupporting>
                            </ImageListItem>
                        );
                    })}
                </ImageList>
            )
        }}
    </Query>
);

interface IState {
    inputText: string;
    standardLayout: boolean;
}

class SearchBox extends React.Component<{}, IState>{
    constructor(props: any){
        super(props);
        this.state = {inputText: "", standardLayout: true};
    }

    public render(){
        return (
            <div>
                <TextField  style={{margin: "20px", display: 'inline-block'}} label="standard..." onChange={(event: any)=> {
                    this.setState({inputText: event.target.value});
                }} type="text" value={this.state.inputText}/>
                <div style={{display: "inline-block", paddingLeft: "20px"}}>
                    <Switch
                        checked={this.state.standardLayout}
                        onChange={(event: any) => this.setState({standardLayout: event.target.checked})}>
                        Standard Layout
                    </Switch>
                </div>
                {pictureAlbumCover(this.state.inputText, this.state.standardLayout)}
            </div>
        );
    }
}

const App = () => (
    <SearchBox />
);

export default App;
