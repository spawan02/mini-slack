import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';

const MyEmojiPicker = () => {
    const [emoji, setEmoji] = useState('');
    const [showPicker, setShowPicker] = useState(false);

    const onEmojiClick = (event, emojiObject) => {
        console.log(emojiObject)
        setEmoji(emojiObject.emoji);
        setShowPicker(false);
    };

    return (
        <div>
            <button onClick={() => setShowPicker(!showPicker)}>
                {showPicker ? 'Close Emoji Picker' : 'Open Emoji Picker'}
            </button>
            {showPicker && (
                <EmojiPicker onEmojiClick={(e) => onEmojiClick} />
            )}
            <div>
                <h3>Selected Emoji:</h3>
                <span style={{ fontSize: '2rem' }}>{emoji}</span>
            </div>
        </div>
    );
};

export default MyEmojiPicker;
