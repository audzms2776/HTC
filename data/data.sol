pragma solidity ^0.4.0;


contract CC {

    // 여행지 방문 시 지급할 토큰 데이터 구조체
    struct TokenData {
        uint256 money; // 지급할 금액
        bytes32 place; // 방문한 장소
    }

    mapping(address => uint256) private balance;
    mapping(address => TokenData[]) private userlogs;
    mapping(bytes32 => address) private placeAddressMap;

    // 새로운 사용자 추가
    function addUser() public {
        balance[msg.sender] = 0;
    }

    // 장소별 주소 등록
    function addPlaceAddress(bytes32 place, address placeAddress) public {
        placeAddressMap[place] = placeAddress;
    }
    
    // 사용자 금액 확인 
    function getUserBalance() public view returns (uint256) {
        return balance[msg.sender];
    }

    // 토큰 지급
    function addToken(bytes32 place, uint256 money) public {
        // userlogs[msg.sender].push(TokenData(money, place));
        balance[msg.sender] += money;
    }
    
    function getAddress() public view returns (address) {
        return msg.sender;
    }
}