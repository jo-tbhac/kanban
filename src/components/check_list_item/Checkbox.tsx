import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect, ConnectedProps } from 'react-redux';

import * as checkListItemAction from '../../store/check_list_item/actions';

const mapDispatchToProps = {
  toggleCheck: checkListItemAction.toggleCheck,
};

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

type CheckboxProps = PropsFromRedux & {
  check: boolean
  itemId: number
  checkListId: number
}

const Checkbox = (props: CheckboxProps) => {
  const {
    check,
    itemId,
    checkListId,
    toggleCheck,
  } = props;

  const modifire = check ? '--checked' : '';

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => toggleCheck(!check, itemId, checkListId)}
      onKeyPress={() => toggleCheck(!check, itemId, checkListId)}
      className={`checkbox${modifire}`}
    >
      {check && <FontAwesomeIcon icon={['fas', 'check']} className={`checkbox__icon${modifire}`} />}
    </div>
  );
};

export default connector(Checkbox);
