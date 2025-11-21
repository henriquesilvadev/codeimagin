// Emoji Avatar Generator
// Generates consistent emoji avatars for users without profile photos

(function () {
    'use strict';

    // Fun emoji collection for avatars
    const EMOJI_AVATARS = [
        '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃',
        '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '😙',
        '🥲', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫',
        '🤔', '🤐', '🤨', '😐', '😑', '😶', '😏', '😒', '🙄', '😬',
        '🤥', '😌', '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢',
        '🤮', '🤧', '🥵', '🥶', '🥴', '😵', '🤯', '🤠', '🥳', '🥸',
        '😎', '🤓', '🧐', '😕', '😟', '🙁', '☹️', '😮', '😯', '😲',
        '😳', '🥺', '😦', '😧', '😨', '😰', '😥', '😢', '😭', '😱',
        '😖', '😣', '😞', '😓', '😩', '😫', '🥱', '😤', '😡', '😠',
        '🤬', '😈', '👿', '💀', '☠️', '💩', '🤡', '👹', '👺', '👻',
        '👽', '👾', '🤖', '😺', '😸', '😹', '😻', '😼', '😽', '🙀',
        '😿', '😾', '🐵', '🐶', '🐺', '🦊', '🦝', '🐱', '🦁', '🐯',
        '🐴', '🦄', '🐮', '🐷', '🐗', '🐭', '🐹', '🐰', '🐻', '🐨',
        '🐼', '🐸', '🦓', '🦒', '🦘', '🦙', '🦥', '🦦', '🦧', '🦨'
    ];

    // Simple hash function to get consistent emoji for user
    function hashCode(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return Math.abs(hash);
    }

    // Get emoji for user based on email
    function getEmojiForUser(email) {
        const hash = hashCode(email);
        const index = hash % EMOJI_AVATARS.length;
        return EMOJI_AVATARS[index];
    }

    // Get random emoji
    function getRandomEmoji() {
        const index = Math.floor(Math.random() * EMOJI_AVATARS.length);
        return EMOJI_AVATARS[index];
    }

    // Export functions
    window.EmojiAvatar = {
        getForUser: getEmojiForUser,
        getRandom: getRandomEmoji
    };

})();
