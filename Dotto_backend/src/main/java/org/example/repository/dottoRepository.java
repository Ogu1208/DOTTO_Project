package org.example.repository;

//public class dottoRepository {
//}

import org.example.domain.dotto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface dottoRepository extends JpaRepository<dotto, Long> {
}