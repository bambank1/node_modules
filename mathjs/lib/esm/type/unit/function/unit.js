import { factory } from '../../../utils/factory.js';
import { deepMap } from '../../../utils/collection.js';
var name = 'unit';
var dependencies = ['typed', 'Unit']; // This function is named createUnitFunction to prevent a naming conflict with createUnit

export var createUnitFunction = /* #__PURE__ */factory(name, dependencies, _ref => {
  var {
    typed,
    Unit
  } = _ref;

  /**
   * Create a unit. Depending on the passed arguments, the function
   * will create and return a new math.Unit object.
   * When a matrix is provided, all elements will be converted to units.
   *
   * Syntax:
   *
   *     math.unit(unit : string)
   *     math.unit(value : number, unit : string)
   *
   * Examples:
   *
   *    const a = math.unit(5, 'cm')    // returns Unit 50 mm
   *    const b = math.unit('23 kg')    // returns Unit 23 kg
   *    a.to('m')                       // returns Unit 0.05 m
   *
   * See also:
   *
   *    bignumber, boolean, complex, index, matrix, number, string, createUnit
   *
   * @param {* | Array | Matrix} args   A number and unit.
   * @return {Unit | Array | Matrix}    The created unit
   */
  return typed(name, {
    Unit: function Unit(x) {
      return x.clone();
    },
    string: function string(x) {
      if (Unit.isValuelessUnit(x)) {
        return new Unit(null, x); // a pure unit
      }

      return Unit.parse(x, {
        allowNoUnits: true
      }); // a unit with value, like '5cm'
    },
    'number | BigNumber | Fraction | Complex, string': function numberBigNumberFractionComplexString(value, unit) {
      return new Unit(value, unit);
    },
    'Array | Matrix': function ArrayMatrix(x) {
      return deepMap(x, this);
    }
  });
});