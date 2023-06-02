import React from "react";
import img from "../images/meme.jpeg"

export default function Meme() {
    const [meme, Setmeme] = React.useState({
        TopText: "",
        BottomText: "",
        randomImage: img
    })
    const [allMeme, SetallMeme] = React.useState([]);

    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => SetallMeme(data.data.memes))
    }, [])

    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMeme.length)
        const url = allMeme[randomNumber].url
        Setmeme({
            TopText: "",
            BottomText: "",
            randomImage: url
        })
    }

    function handleChange(event) {
        const { name, value } = event.target
        Setmeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    return (
        <main>
            <div className="form">
                <input
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name="TopText"
                    value={meme.TopText}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name="BottomText"
                    value={meme.BottomText}
                    onChange={handleChange}
                />
                <button
                    className="form--button"
                    onClick={getMemeImage}
                >
                    Get a new meme image
                </button>
            </div>
            <div className="meme">
                <img src={meme.randomImage} className="meme--image" />
                <h2 className="meme--text top">{meme.TopText}</h2>
                <h2 className="meme--text bottom">{meme.BottomText}</h2>
            </div>
        </main>
    )
}