import React, {
  useState,
  useCallback,
  useContext,
  ChangeEvent,
} from 'react';
import { connect, ConnectedProps } from 'react-redux';

import CardContext from '../../context/CardContext';
import CardSideBarButton from './CardSideBarButton';
import CardMenuForm from './CardMenuForm';
import CheckListForm from '../check_list/CheckListForm';
import * as checkListAction from '../../store/check_list/actions';
import {
  checkListButtonText,
  newCheckListText,
  createButtonText,
  initialCheckListTitle,
} from '../../utils/text';

const mapDispatchToProps = {
  createCheckList: checkListAction.createCheckList,
};

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

export const CardSideBarCheckListButton = (props: PropsFromRedux) => {
  const { createCheckList } = props;

  const [formVisible, setFormVisible] = useState(false);
  const [title, setTitle] = useState(initialCheckListTitle);

  const card = useContext(CardContext);

  const openForm = useCallback(() => {
    setFormVisible(true);
  }, []);

  const closeForm = useCallback(() => {
    setTitle(initialCheckListTitle);
    setFormVisible(false);
  }, []);

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  }, []);

  const submit = useCallback(() => {
    if (card) {
      createCheckList(title, card.id);
    }
  }, [title, card, createCheckList]);

  return (
    <>
      <CardSideBarButton
        text={checkListButtonText}
        icon={['far', 'check-square']}
        onClick={openForm}
      />
      {formVisible && (
        <CardMenuForm
          targetClassName="checkListForm"
          headerText={newCheckListText}
          buttonText={createButtonText}
          buttonDisabled={title === ''}
          onSubmit={submit}
          onClickClose={closeForm}
          component={<CheckListForm title={title} onChange={onChange} />}
        />
      )}
    </>
  );
};

export default connector(CardSideBarCheckListButton);
