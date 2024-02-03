exports.getDifficulties = (difficulty) => {
    const difficulties = [
        'Very Easy',
        'Easy',
        'Medium (Standard 3x3)',
        'Intermediate',
        'Expert',
        'Hardcore'
    ];

    const options = difficulties.map((diff, i) => {
        return {
            title: `${i + 1} - ${diff}`,
            value: i + 1,
            selected: difficulty === i + 1
        }
    })

    return options;
}