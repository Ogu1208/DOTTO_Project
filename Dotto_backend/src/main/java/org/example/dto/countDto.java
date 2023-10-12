package org.example.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.domain.dotto;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class countDto {
    private int num;

    //생성자 추가
    public dotto toEntity() {
        return dotto.builder()
                .num(num)
                .build();
    }
}
