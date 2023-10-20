import XCTest
@testable import example

class AdditionTests: XCTestCase {
    
    func testAddition() {
        XCTAssertEqual(add(2, 3), 5)
        XCTAssertEqual(add(-1, 1), 0)
        XCTAssertEqual(add(0, 0), 0)
        XCTAssertEqual(add(10, -5), 5)
    }
    
    // You can add more test cases here
    
    static var allTests = [
        ("testAddition", testAddition),
    ]
}

#if !os(macOS)
extension AdditionTests {
    static let __allTests = [
        ("testAddition", testAddition),
    ]
}
#endif