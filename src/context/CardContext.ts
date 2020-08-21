import { createContext } from 'react';

import { Card } from '../store/card/types';

const CardContext = createContext<Card | null>(null);

export default CardContext;
