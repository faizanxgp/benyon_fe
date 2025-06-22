import slideUp from './slideUp'
import slideDown from './slideDown'

export default function sectionToggle(target, duration=500) {
    const isHidden = target.classList.contains('hidden');
    if (isHidden) {
        slideDown(target, duration);  
    } else {
        slideUp(target, duration); 
    }
};