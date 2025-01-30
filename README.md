# Environmental Education Family Feud Game

A customized Family Feud / scavenger hunt specifically for environmental literacy and career readiness. Interactive fun-style game designed for environmental education and career readiness workshop. The game focuses on work-based learning, Industry Recognized Credentials (IRCs), and environmental career pathways, OH MY...even more! 

## Features

- Interactive game board with reveal animations
- Score tracking system
- Three-strike system
- Sound effects for reveals and strikes
- Multiple rounds of questions
- Custom question upload via CSV
- Mobile-responsive design
- Environmental education themed UI

## Prerequisites

- Node.js (v14 or higher)
- React (v17 or higher)
- Tailwind CSS
- shadcn/ui components

## Installation

1. Add the component to your project:
```bash
cp EnvironmentalFeud.jsx src/components/
```

2. Install required dependencies:
```bash
npm install lucide-react papaparse @/components/ui
```

3. Import and use the component:
```jsx
import EnvironmentalFeud from './components/EnvironmentalFeud';

function App() {
  return (
    <div>
      <EnvironmentalFeud />
    </div>
  );
}
```

## Custom Questions Format

To add your own questions, prepare a .CSV file in the following format:

```csv
What is your question?
Answer 1,30
Answer 2,25
Answer 3,20
Answer 4,15
Answer 5,12
Answer 6,10
Answer 7,8
Answer 8,5
Next Question?
...
```

- Each question should be followed by exactly 8 answers
- Each answer line should have the answer text and point value, separated by a comma
- Point values should be numbers between 1 and 100

## Default Question Categories

The game comes pre-loaded with questions about:
1. Career Preparation Activities
2. IRC Approval Criteria
3. Career Awareness Activities
4. Apprenticeship Maryland Requirements

## Game Controls

- **Strike Button**: Adds a strike (X) when wrong answers are given (maximum 3)
- **Next Round**: Advances to the next question
- **Reset Game**: Starts the game over from the beginning

## Customization

You can modify the following aspects:
- Default questions in the `defaultRounds` array
- UI colors in the Tailwind classes
- Animation timings in the CSS
- Sound effects URLs

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## Usage Tips

1. **For Presenters**:
   - Use a large display or projector
   - Have a designated person to control the game
   - Consider dividing participants into teams (more fun...)
   - Use as a review activity or ice breaker (scavenger hunt...)

2. **For Development**:
   - Test custom CSVs before the event
   - Ensure sound effects are working
   - Check display on target screen size (and Enjoy!)

## License

MIT License - feel free to modify and use as needed.

# Acknowledgments

- Inspired by the classic Family Feud game show
- Developed for environmental education workshops
- Uses sound effects from cdnjs.cloudflare.com
- Built with React and Tailwind CSS 

## Support

For issues or questions, please open an issue in the repository or contact the development team.
