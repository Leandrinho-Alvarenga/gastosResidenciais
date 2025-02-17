import PropTypes from 'prop-types';
import * as C from './styles';

const ResumeItem  = ({title, Icon, value}) => {
    return (
        <C.Container>
        <C.Header>
          <C.HeaderTitle>{JSON.stringify(title)}</C.HeaderTitle>
          <Icon/>
        </C.Header>
        <C.Total>{JSON.stringify(value)}</C.Total>
      </C.Container>
    );
};


ResumeItem.propTypes = {
    title: PropTypes.string.isRequired,
    Icon: PropTypes.func.isRequired,
    value: PropTypes.number.isRequired,
}
export default ResumeItem;