import React, { useEffect, useCallback, useContext } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as cardDetailActions from '../../store/card_detail/actions';
import CardContext from '../../context/CardContext';
import CardTitle from './CardTitle';
import CardLabelContainer from './CardLabelContainer';
import CardDescription from './CardDescription';
import CheckListIndex from '../check_list/CheckListIndex';
import FileIndex from '../file/FileIndex';
import CardSideBar from './CardSideBar';
import Cover from '../cover/Cover';

const mapDispatchToProps = {
  closeCardDetail: cardDetailActions.closeCardDetail,
};

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

export const CardDetail = (props: PropsFromRedux) => {
  const { closeCardDetail } = props;

  const card = useContext(CardContext);

  const onClickOverlayEvent = useCallback((event: MouseEvent) => {
    const element = event.target as HTMLElement;
    if (element.className === 'cardDetailOverlay') {
      closeCardDetail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.addEventListener('click', onClickOverlayEvent);
    return () => {
      window.removeEventListener('click', onClickOverlayEvent);
    };
  }, [onClickOverlayEvent]);

  return (
    <div data-testid="cardDetail" className="cardDetailOverlay">
      <div className="cardDetailContainer">
        {card?.cover && <Cover card={card} />}

        <div
          data-testid="cardDetailCloseButton"
          role="button"
          tabIndex={0}
          onClick={closeCardDetail}
          onKeyPress={closeCardDetail}
          className="cardDetailCloseButton"
        >
          <FontAwesomeIcon icon={['fas', 'times']} />
        </div>

        <div className="cardDetailHeader">
          <CardTitle />
        </div>
        <div className="cardDetail">
          <div className="cardDetailMain">
            <CardLabelContainer />
            <CardDescription />
            <CheckListIndex />
            <FileIndex />
          </div>
          <CardSideBar />
        </div>
      </div>
    </div>
  );
};

export default connector(CardDetail);
