package org.example.Service;


import lombok.RequiredArgsConstructor;
import org.example.domain.dotto;
import org.example.dto.countDto;
import org.example.repository.dottoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
//@RequiredArgsConstructor
@Service
public class dottoService {
    private final dottoRepository repository;

    @Autowired
    public dottoService(dottoRepository repository){
        this.repository = repository;
    }

    public dotto save(countDto request){
        return repository.save(request.toEntity());
    }

//    public int incrementNumber() {
//        NumberCounter counter = repository.findById(1L).orElseGet(() -> new NumberCounter());
//        counter.setCount(counter.getCount() + 1);
//        repository.save(counter);
//        return counter.getCount();
//    }
}
