package domain;

import org.junit.Test;
import static org.junit.Assert.*;

public class SubjectSpecificationTest {

    @Test
    public void hasSubject_WithMatchingId_ReturnsTrue() {
        SubjectSpecification spec = new SubjectSpecification();
        assertTrue("Expected true when IDs match", spec.hasSubject("id1", "id1"));
    }

    @Test
    public void hasSubject_WithNonMatchingId_ReturnsFalse() {
        SubjectSpecification spec = new SubjectSpecification();
        assertFalse("Expected false when IDs do not match", spec.hasSubject("id1", "id2"));
    }
}
