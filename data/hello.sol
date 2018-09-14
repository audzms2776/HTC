pragma solidity ^0.4.0;


contract SimpleStorage {
    uint256 cnt = 5;
    
    function add() public {
        cnt = cnt + 1;
    }
    
    function sub() public {
        cnt = cnt - 1;
    }
    
    function getCounter() public constant returns (uint256){
        return cnt;
    }
    
    function setCounter(uint data) public {
        cnt = data;
    }
    
    function pp () public {
        cnt = cnt + 2;
    }

}