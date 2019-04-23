import * as React from 'react'

class Setting extends React.Component {
  var roomSetting = function() {

};

roomSetting.prototype.time = 0;
roomSetting.prototype.playerSize = 0;
roomSetting.prototype.turns = 0;

roomSetting.prototype.printSetting = function() {
  console.log("Time: " + this.time + "\n" +
    "Player Size: " + this.playerSize + "\n" +
    "Turns: " + this.turns + "\n");
};

